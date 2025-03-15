import type { AdSchema, AdType } from "./AdSchema";

export async function fetchAds(type: AdType | null): Promise<AdSchema[]> {
  const BASE_URL =
    "https://my-json-server.typicode.com/akramsaouri/ad-performance/ads";

  const searchParams = new URLSearchParams();
  if (type && type != null) {
    searchParams.append("type", type);
  }
  searchParams.toString();

  const params = searchParams.size > 0 ? `?${searchParams.toString()}` : "";
  const response = await fetch(`${BASE_URL}${params}`);

  return await response.json();
}
