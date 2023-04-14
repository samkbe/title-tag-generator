import { JSONresponse, SerpProps } from "../types";

export function MetaTagDisplay({ data }: JSONresponse) {
  if (data.__typename === "success") {
    return (
      <div className="flex flex-col justify-center min-h-96 mt-8 mb-4">
        {data.options.map(({ descriptionTag, titleTag }) => (
          <SerpTile
            url={data.url}
            key={titleTag}
            descriptionTag={descriptionTag}
            titleTag={titleTag}
          />
        ))}
      </div>
    );
  } else {
    return <>Error....</>;
  }
}

function SerpTile({ titleTag, descriptionTag, url }: SerpProps) {
  return (
    <div className="">
      <div
        onClick={() => {
          navigator.clipboard.writeText(titleTag);
        }}
        className="hover:bg-lightestGrey relative cursor-copy"
      >
        {/* <RiFileCopyLine size="12" className="top-0 left-0" /> */}
        <h3 className="text-googleBlue text-2xl p-1">{titleTag}</h3>
      </div>
      <div
        onClick={() => {
          navigator.clipboard.writeText(descriptionTag);
        }}
        className="hover:bg-lightestGrey relative cursor-copy"
      >
        <h3 className="text-googleGrey text-sm p-1">{descriptionTag}</h3>
      </div>
    </div>
  );
}
