import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type serpProps = {
  titleTag: string;
  descriptionTag: string;
  url: string;
};

export function Inputs() {
  const [url, setUrl] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const { data, isError, refetch, isRefetching } = useQuery(
    ["metaTag"],
    () => getMetaTags(keyword, url, companyName),
    {
      enabled: false,
    }
  );

  if (isRefetching) {
    return <>Loading...</>;
  } else if (isError) {
    return <>Error....</>;
  } else {
    return (
      <form
        className="flex flex-col relative h-full"
        onSubmit={async (e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <div className="flex flex-col w-4/5">
          <input
            required
            className="p-2 rounded-md w-full"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="www.johnsplumbingservices.com"
          ></input>
          <input
            required
            className="p-2 rounded-md"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="John's Plumbing"
          ></input>
          <input
            required
            className="p-2 rounded-md"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Plumbing services"
          ></input>
        </div>
        {data ? (
          <div>
            {data.options.map(({ descriptionTag, titleTag }) => (
              <SERP
                url={data.url}
                key={titleTag}
                descriptionTag={descriptionTag}
                titleTag={titleTag}
              />
            ))}
          </div>
        ) : isRefetching ? (
          <div>
            <SERPLoading />
            <SERPLoading />
            <SERPLoading />
          </div>
        ) : (
          <></>
        )}
        <button
          className="bg-googleBlue hover:bg-blue-700 text-white font-bold py-2 p-4 rounded absolute bottom-0 right-0 m-2"
          type="submit"
        >
          {data ? "Generate More" : "Generate"}
        </button>
      </form>
    );
  }
}

async function getMetaTags(keyword: string, url: string, companyName: string) {
  const response = await fetch("/api/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: keyword,
      url: url,
      companyName: companyName,
    }),
  });
  const data = await response.json();
  return data;
}

function SERPLoading() {
  return (
    <div role="status" className="max-w-sm animate-pulse p-2 m-1">
      <div className="h-2.5 bg-lightGrey rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-lightGrey rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-lightGrey rounded-full mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function SERP({ titleTag, descriptionTag, url }: serpProps) {
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
