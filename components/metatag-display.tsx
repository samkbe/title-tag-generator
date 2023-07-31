import { GeneratedKeyword, SerpTileProps } from "../types";

export function MetaTagDisplay({ keyword, options }: GeneratedKeyword) {
  return (
    <div className="flex flex-col justify-center min-h-96 mt-8 mb-4">
      <h1>Keyword: {keyword}</h1>
      {options.map(({ descriptionTag, titleTag }) => (
        <SerpTile
          key={titleTag}
          descriptionTag={descriptionTag}
          titleTag={titleTag}
        />
      ))}
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
