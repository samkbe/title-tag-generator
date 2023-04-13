import { JSONresponse, SerpProps } from "../types";

export function MetaTagDisplay({ data }: JSONresponse) {
  if (data.__typename === "success") {
    return (
      <div>
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
    <div className="p-2 m-1">
      <div className="hover:bg-lightestGrey relative">
        {/* <RiFileCopyLine size="12" className="top-0 left-0" /> */}
        <h3 className="text-googleBlue text-2xl p-1">{titleTag}</h3>
      </div>
      <div className="hover:bg-lightestGrey relative">
        <h3 className="text-googleGrey text-sm p-1">{descriptionTag}</h3>
      </div>
    </div>
  );
}
