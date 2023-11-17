import { GeneratedKeyword, SerpTileProps } from "../types";

export function MetaTagDisplay({
  keyword,
  descriptionTag,
  titleTag,
}: GeneratedKeyword) {
  return (
    <div className="flex flex-col justify-center max-w-6xl mt-8 mb-4">
      <h1 className="text-sm">
        Keyword: <span className="text-3xl">{keyword}</span>
      </h1>
      <div className="border-lightestGrey rounded-md border-2 p-2">
        <SerpTile
          key={titleTag}
          descriptionTag={descriptionTag}
          titleTag={titleTag}
        />
      </div>
    </div>
  );
}

function SerpTile({ titleTag, descriptionTag }: SerpTileProps) {
  return (
    <div className="">
      <div
        onClick={() => {
          navigator.clipboard.writeText(titleTag);
        }}
        className="hover:bg-lightestGrey relative cursor-copy"
      >
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
