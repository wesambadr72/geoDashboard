import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import type { Country, CountryResponse } from "shared/src/index";
import { TOP_COUNTRY_CODES } from "shared/src/index";

import * as fs from "node:fs";
import * as path from "node:path";

const app = new Hono();

// نظام كاش بسيط يعتمد على ملف JSON محلي لحفظ البيانات عند إعادة تشغيل السيرفر
const CACHE_FILE = path.join(process.cwd(), "cache.json");
const CACHE_TTL = 3 * 24 * 60 * 60 * 1000; // 3 أيام

function loadCache(): Record<string, { data: any; expiry: number }> {
	try {
		if (fs.existsSync(CACHE_FILE)) {
			const rawData = fs.readFileSync(CACHE_FILE, "utf-8");
			return JSON.parse(rawData);
		}
	} catch (error) {
		console.error("Error loading cache file:", error);
	}
	return {};
}

function saveCache(cacheData: Record<string, { data: any; expiry: number }>) {
	try {
		fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), "utf-8");
	} catch (error) {
		console.error("Error saving cache file:", error);
	}
}

// تحميل الكاش المخزن سابقاً عند بدء تشغيل السيرفر
const cache = loadCache();

function getFromCache(key: string) {
	const item = cache[key];
	if (item && item.expiry > Date.now()) {
		return item.data;
	}
	// إذا انتهت صلاحية الكاش، نقوم بحذفه وحفظ الحالة الجديدة
	if (item) {
		delete cache[key];
		saveCache(cache);
	}
	return null;
}

function setToCache(key: string, data: any) {
	cache[key] = {
		data,
		expiry: Date.now() + CACHE_TTL
	};
	saveCache(cache);
}

app.use(cors());
app.use(logger());

app.get("/", (c) => {
	return c.text("Hello it's GeoDashboard!");
});

app.get("/countries", async (c) => {
	try {
		// بما أن الـ API يحد النتائج بـ 100 في الطلب الواحد، وسعر الخطة المجانية محدود،
		// سنقوم بجلب الدول على 3 دفعات لضمان تغطية كل دول العالم (حوالي 250 دولة)	
		// التحقق من الكاش أولاً
		const cachedData = getFromCache("all_countries");
		if (cachedData) return c.json(cachedData, 200);

		const fetchPage = async (offset: number) => {
			const res = await fetch(`https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
				{ headers: { 'Authorization': `Bearer ${import.meta.env.REST_COUNTRIES_API_KEY}` } }
			);
			const json = await res.json() as CountryResponse;
			return json.data.objects as Country[];
		};

		const [page1, page2, page3] = await Promise.all([
			fetchPage(0),
			fetchPage(100),
			fetchPage(200)
		]);

		const allCountries = [...page1, ...page2, ...page3];

		// الآن نقوم بالتصفية بناءً على الأكواد التي اخترناها 
		const filteredCountries = allCountries.filter(country =>
			TOP_COUNTRY_CODES.includes(country.codes.alpha_2)
		);

		// ترتيب الدول أبجدياً حسب الاسم الشائع لسهولة البحث
		filteredCountries.sort((a, b) => a.names.common.localeCompare(b.names.common));

		// حفظ في الكاش
		setToCache("all_countries", filteredCountries);

		return c.json(filteredCountries, { status: 200 });
	} catch (error) {
		console.error("Fetch Countries Error:", error);
		return c.json({ error: "Failed to fetch countries" }, 500);
	}
});


app.get("/top-codes", (c) => {
	return c.json(TOP_COUNTRY_CODES, { status: 200 });
});

app.get("/:country", async (c) => {
	const country = c.req.param("country");

	// التحقق من الكاش
	const cachedCountry = getFromCache(`country_${country}`);
	if (cachedCountry) return c.json(cachedCountry, 200);

	const response = await fetch(`https://api.restcountries.com/countries/v5?q=${country}`,
		{ headers: { 'Authorization': `Bearer ${import.meta.env.REST_COUNTRIES_API_KEY}` } }
	);

	const result = (await response.json()) as CountryResponse;
	try {
		const countryData = result.data.objects[0] as Country;
		// حفظ في الكاش
		setToCache(`country_${country}`, countryData);
		return c.json(countryData, { status: 200 });
	} catch (error) {
		return c.json({ error: "Country not found" }, 404);
	}
});

export default {
  port: 3000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
};
