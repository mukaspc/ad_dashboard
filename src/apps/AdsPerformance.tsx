"use client";
import { use, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { fetchAds } from "../api/fetchAds";
import type { AdSchema, AdType } from "../api/AdSchema";
import { AdSummary } from "../components/AdSummary";
import { AdRenderer } from "../components/AdRenderer";
import { Dropdown, DropdownOption } from "../components/Dropdown";

export function AdsPerformance() {
  const [filter, setFilter] = useState<AdType | null>(null);
  const adsListRemote = fetchAds(filter);

  const filterTypes: Array<DropdownOption<AdType>> = [
    { label: "All Ads", value: null },
    { label: "Image", value: "image" },
    { label: "Video", value: "video" },
    { label: "Text", value: "text" },
  ];

  return (
    <section id="AdsPerformance">
      <div className="grid gap-y-10 container py-10">
        <section className="flex items-center justify-between gap-2">
          <h1 className="text-xl md:text-3xl font-semibold flex-1">
            Ad Performance Dashboard
          </h1>
          <Dropdown
            id="AdsFilter"
            options={filterTypes}
            value={filter}
            onChange={(event) => setFilter(event.target.value as AdType | null)}
          />
        </section>

        <ErrorBoundary
          fallback={
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
              role="alert"
            >
              <span className="font-medium">
                Something went wrong while loading ads
              </span>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <AdsDashboard adsListRemote={adsListRemote} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}

function AdsDashboard({
  adsListRemote,
}: {
  adsListRemote: Promise<AdSchema[]>;
}) {
  const ads = use(adsListRemote);

  return (
    <section className="grid gap-y-6">
      <AdSummary ads={ads} />
      <AdRenderer ads={ads} />
    </section>
  );
}
