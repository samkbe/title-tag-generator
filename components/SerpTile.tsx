"use client";
import { SerpTileProps, GeneratedKeywordResponse } from "../types";
import { useQuery } from "@tanstack/react-query";

export function Tile({
  keyword,
  url,
  companyName,
}: {
  keyword: string;
  url: string;
  companyName: string;
}) {
  const { data, isError, refetch, isRefetching, isFetching } = useQuery(
    ["fetchSeoData", keyword, url, companyName],
    () => fetchSeoData({ keyword, url, companyName, llm: "open-ai" }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    }
  );

  return (
    <div className="flex flex-col justify-center max-w-6xl mt-8 mb-4">
      <h1 className="text-sm">
        Keyword: <span className="text-sm">{keyword}</span>
      </h1>
      <div className="border-lightestGrey rounded-md border-2 p-2">
        {data ? (
          <SerpTile
            descriptionTag={data.descriptionTag}
            titleTag={data.titleTag}
          />
        ) : null}
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

async function fetchSeoData(body: {
  keyword: string;
  url: string;
  companyName: string;
  llm: "open-ai";
}): Promise<GeneratedKeywordResponse> {
  console.log("REFETCHED!");
  const fetchUrl = new URL(window.location.origin + "/api/get-tags/");
  fetchUrl.search = new URLSearchParams(body).toString();

  const response = await fetch(fetchUrl, {
    method: "GET",
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw Error();
  }
}