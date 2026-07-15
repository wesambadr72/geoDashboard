import type { Country } from "shared";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || `http://${window.location.hostname}:3000`;

/**
 * جلب جميع الدول المتاحة من الخادم
 */
export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(`${SERVER_URL}/countries`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

/**
 * جلب تفاصيل دولة معينة باستخدام رمزها أو اسمها
 * @param countryName رمز الدولة (مثل SA) أو اسمها
 */
export async function fetchCountryDetails(countryName: string): Promise<Country> {
  const response = await fetch(`${SERVER_URL}/${countryName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch country details: ${response.statusText}`);
  }
  return response.json();
}
