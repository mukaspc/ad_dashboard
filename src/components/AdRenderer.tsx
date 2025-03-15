import { AdSchema } from "../api/AdSchema";
import { AdCard } from "./AdCard";

interface AdRendererProps {
  ads: AdSchema[];
}

export function AdRenderer(props: AdRendererProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.ads.length === 0 ? (
        <div
          className="col-span-3 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
          role="alert"
        >
          <span className="font-medium">No ads found</span>
        </div>
      ) : (
        props.ads.map((ad) => <AdCard key={ad.id} ad={ad} />)
      )}
    </section>
  );
}
