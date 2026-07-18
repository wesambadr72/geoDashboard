import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger';
import { env } from 'hono/adapter';
import type { Country, CountryResponse } from "shared/src/index";
import { TOP_COUNTRY_CODES } from "shared/src/index";

import * as fs from "node:fs";
import * as path from "node:path";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

const app = new Hono<{
  Bindings: {
    REST_COUNTRIES_API_KEY: string;
    GEO_CACHE: KVNamespace;
  }
}>();

// --- نظام الكاش المحلي (البديل للتشغيل المحلي) ---
const CACHE_FILE = path.join(process.cwd(), "cache.json");
const CACHE_TTL = 3 * 24 * 60 * 60 * 1000; // 3 أيام بالملي ثانية

function loadLocalCache(): Record<string, { data: any; expiry: number }> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    }
  } catch (error) {
    console.error("Error loading cache file:", error);
  }
  return {};
}

function saveLocalCache(cacheData: Record<string, { data: any; expiry: number }>) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving cache file:", error);
  }
}

const localCache = loadLocalCache();

// --- نظام الكاش الهجين (يدعم Cloudflare KV و Local File) ---
async function getFromCache(c: any, key: string): Promise<any> {
  // إذا كنا على Cloudflare ولدينا مخزن KV
  if (c.env?.GEO_CACHE) {
    const cached = await c.env.GEO_CACHE.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  // التشغيل المحلي
  const item = localCache[key];
  if (item && item.expiry > Date.now()) {
    return item.data;
  }
  if (item) {
    delete localCache[key];
    saveLocalCache(localCache);
  }
  return null;
}

async function setToCache(c: any, key: string, data: any): Promise<void> {
  if (c.env?.GEO_CACHE) {
    // التخزين في KV مع تحديد وقت الصلاحية بـ 3 أيام (بالثواني)
    await c.env.GEO_CACHE.put(key, JSON.stringify(data), {
      expirationTtl: 3 * 24 * 60 * 60 
    });
    return;
  }

  // التشغيل المحلي
  localCache[key] = {
    data,
    expiry: Date.now() + CACHE_TTL
  };
  saveLocalCache(localCache);
}

// --- مسارات الـ API ---
app.use(cors());
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello it's GeoDashboard!");
});

app.get("/countries", async (c) => {
  try {
    const { REST_COUNTRIES_API_KEY } = env(c);
    
    const cachedData = await getFromCache(c, "all_countries");
    if (cachedData) return c.json(cachedData, 200);

    const fetchPage = async (offset: number) => {
      const res = await fetch(
        `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
        { headers: { 'Authorization': `Bearer ${REST_COUNTRIES_API_KEY}` } }
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

    await setToCache(c, "all_countries", filteredCountries);

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
  const { REST_COUNTRIES_API_KEY } = env(c);

  const cachedCountry = await getFromCache(c, `country_${country}`);
  if (cachedCountry) return c.json(cachedCountry, 200);

  const response = await fetch(
    `https://api.restcountries.com/countries/v5?q=${country}`,
    { headers: { 'Authorization': `Bearer ${REST_COUNTRIES_API_KEY}` } }
  );

  const result = (await response.json()) as CountryResponse;
  try {
    const countryData = result.data.objects[0] as Country;
    await setToCache(c, `country_${country}`, countryData);
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
