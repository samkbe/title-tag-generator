import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MetaTagDisplay } from "./metatag-display";

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
          className="border border-lightGrey text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      {isRefetching && (
        <div>
          <SERPLoading />
          <SERPLoading />
          <SERPLoading />
        </div>
      )}
      {data && !isRefetching && <MetaTagDisplay data={data} />}
      <button className="text-sm shadow-xl mb-4 rounded-lg p-3 w-full transition-all duration-500 transform hover:-translate-y-1 absolute bottom-0">
        {data ? "Generate More" : "Generate"}
      </button>
    </form>
  );
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
  const data: Response = await response.json();
  return data;
}

type Response = Success | Failed;
type Failed = {
  __typename: "failed";
  message: string;
};
type Success = {
  __typename: "success";
  url: string;
  options: Metadata[];
};
type Metadata = {
  titleTag: string;
  descriptionTag: string;
};

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
