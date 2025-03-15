import type { AdSchema } from "../api/AdSchema";

interface AdSummaryProps {
  ads: AdSchema[];
}

export function AdSummary(props: AdSummaryProps) {
  const totals = [
    {
      label: "Total Impressions",
      value: props.ads.reduce(
        (total, currentImpression) => total + currentImpression.impressions,
        0
      ),
    },
    {
      label: "Total Clicks",
      value: props.ads.reduce(
        (total, currentImpression) => total + currentImpression.clicks,
        0
      ),
    },
    {
      label: "Average CTR",
      value: `${(
        props.ads.reduce(
          (total, currentImpression) => total + currentImpression.ctr,
          0
        ) / props.ads.length
      ).toFixed(2)} %`,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {totals.map((total, index) => (
        <article
          key={`Totals_${index}`}
          className="flex flex-col gap-y-2 p-4 bg-white rounded-lg shadow-sm"
        >
          <h2 className="text-sm text-gray-500">{total.label}</h2>
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            {total.value}
          </div>
        </article>
      ))}
    </section>
  );
}
