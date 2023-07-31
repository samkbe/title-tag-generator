import { useQuery } from "@tanstack/react-query";
import type { GetMetadataResponse } from "../types";
import { MetaTagDisplay } from "../components";

type GeneratedTagsDisplayProps = {
  keywords: string[];
  url: string;
  companyName: string;
};

export function GeneratedTagsDisplay({
  keywords,
  url,
  companyName,
}: GeneratedTagsDisplayProps) {
  const { data, isError, refetch, isRefetching, isFetching } = useQuery(
    ["generateMetaTags"],
    () => generateMetaTags({ keywords, url, companyName }),
    {
      enabled: true,
    }
  );

  if (isFetching || isRefetching)
    return (
      <div className="flex flex-col justify-center min-h-96 mt-8 mb-4">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );

  if (isError) return <div>Error</div>;

  if (data?.__typename === "success") {
    return (
      <div className="">
        {data.generatedKeywords.map((keywordResult) => {
          return (
            <MetaTagDisplay key={keywordResult.keyword} {...keywordResult} />
          );
        })}
      </div>
    );
  } else {
    return <div>Sorry, nothing here</div>;
  }
}

async function generateMetaTags({
  keywords,
  url,
  companyName,
}: GeneratedTagsDisplayProps) {
  const response = await fetch("/api/get-metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keywords: keywords,
      url: url,
      companyName: companyName,
    }),
  });
  const data: GetMetadataResponse = await response.json();
  console.log(data);
  return data;
}

function LoadingSkeleton() {
  return (
    <div role="status" className="animate-pulse mb-4">
      <div className="h-2.5 bg-lightGrey rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-lightGrey rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-lightGrey rounded-full mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
