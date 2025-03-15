import { fetchAds } from "../api/fetchAds";

test("fetchAds returns an array", async () => {
  const result = await fetchAds(null);
  expect(Array.isArray(result)).toBe(true);
});

test("fetchAds returns ads with required general properties", async () => {
  const result = await fetchAds(null);
  // prevent infinity loop
  result.length = 5;

  result.forEach((ad) => {
    expect(ad).toHaveProperty("id");
    expect(ad).toHaveProperty("impressions");
    expect(ad).toHaveProperty("clicks");
    expect(ad).toHaveProperty("ctr");
  });
});

test("fetchAds returns text properties for ad with text type", async () => {
  const result = await fetchAds("text");
  const textAd = result.find((ad) => ad.type === "text");

  expect(textAd).toHaveProperty("headline");
  expect(textAd).toHaveProperty("description");
});

test("fetchAds returns image properties for ad with image/video type", async () => {
  const imageAdsResult = await fetchAds("image");
  const videoAdsResult = await fetchAds("video");
  const imageAd = imageAdsResult.find((ad) => ad.type === "image");
  const videoAd = videoAdsResult.find((ad) => ad.type === "video");

  expect(imageAd).toHaveProperty("url");
  expect(videoAd).toHaveProperty("url");
});
