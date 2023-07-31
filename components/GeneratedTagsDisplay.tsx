import { useQuery } from "@tanstack/react-query";
import type { GetMetadataResponse } from "../types";

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
  console.log("PROPS: ", keywords, url, companyName);

  const { data, isError, refetch, isRefetching, isFetching } = useQuery(
    ["generateMetaTags"],
    () => generateMetaTags({ keywords, url, companyName }),
    {
      enabled: true,
    }
  );

  if (isFetching) return <div> Loading</div>;
  if (isError) return <div>Error</div>;

  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  } else {
    return <div></div>;
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
