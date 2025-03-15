import type { AdSchema } from "../api/AdSchema";

interface AdCardProps {
  ad: AdSchema;
}

export function AdCard(props: AdCardProps) {
  function renderMedia() {
    switch (props.ad.type) {
      case "image": {
        return (
          <img
            src={props.ad.url}
            className="z-10 object-cover object-center w-full h-44 transition duration-700 ease-out group-hover:scale-105"
            alt={props.ad.type}
          />
        );
      }
      case "video": {
        return (
          <video className="object-cover w-full h-44" autoPlay muted controls>
            <source src={props.ad.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }

      case "text": {
        return (
          <article className="flex flex-col gap-y-2 p-4 mt-7">
            <div className="text-lg text-gray-900 font-semibold tracking-tight">
              {props.ad.headline}
            </div>
            <div className="text-sm text-gray-500">{props.ad.description}</div>
          </article>
        );
      }

      default: {
        console.error("Media type not implemented");
        return (
          <article className="flex flex-col p-4 mt-7">
            <div className="text-sm text-gray-500">Media type implemented</div>
          </article>
        )
      }
    }
  }

  return (
    <article className="group flex rounded-md flex-col overflow-hidden  shadow-sm">
      <div className="relative isolate h-44 overflow-hidden bg-white shadow-sm">
        <span className="absolute z-20 text-sm px-2 rounded-md top-3 left-3 bg-gray-200 capitalize">
          {props.ad.type}
        </span>
        {renderMedia()}
      </div>
      <div className="flex flex-col gap-4 p-6 bg-white">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <article className="flex flex-col gap-y-1">
            <h2 className="text-sm text-gray-500">Impressions</h2>
            <div className="text-sm text-gray-900 font-semibold tracking-tight">
              {props.ad.impressions}
            </div>
          </article>
          <article className="flex flex-col gap-y-1">
            <h2 className="text-sm text-gray-500">Clicks</h2>
            <div className="text-sm text-gray-900 font-semibold tracking-tight">
              {props.ad.clicks}
            </div>
          </article>
          <article className="flex flex-col gap-y-1">
            <h2 className="text-sm text-gray-500">CTR</h2>
            <div className="text-sm text-gray-900 font-semibold tracking-tight">
              {props.ad.ctr.toString()} %
            </div>
          </article>
        </section>
      </div>
    </article>
  );
}
