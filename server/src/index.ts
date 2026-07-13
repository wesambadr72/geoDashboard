import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import type { Country, CountryResponse } from "shared/src/index";

const app = new Hono();

app.use(cors());
app.use(logger());

app.get("/", (c) => {
	return c.text("Hello it's GeoDashboard!");
});

app.get("/countries", async (c) => {
	const response = await fetch('https://api.restcountries.com/countries/v5',
		{ headers: { 'Authorization': `Bearer ${import.meta.env.REST_COUNTRIES_API_KEY}` } }
	);
	try{
		const result = (await response.json()) as CountryResponse;
		return c.json(result.data.objects.map((item) => item.names.official) as string[], { status: 200 });
	}catch(error){
		return c.json({ error: "Failed to fetch countries" }, 500);
	}
});

app.get("/:country", async (c) => {
	const country = c.req.param("country");
	const response = await fetch(`https://api.restcountries.com/countries/v5?q=${country}`,
		{ headers: { 'Authorization': `Bearer ${import.meta.env.REST_COUNTRIES_API_KEY}` } }
	);

	const result = (await response.json()) as CountryResponse;
	try{
		const countryData: Country = result.data.objects[0] as Country;
		return c.json(countryData.names, { status: 200 });
	}catch(error){
			return c.json({ error: "Country not found" }, 404);
	}

});

export default app;
