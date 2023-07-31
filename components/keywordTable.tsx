import { Table } from "@mui/joy";
import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "google-ads-api";

type Props = {
  keyword: string;
  keywordSuggestions: Set<string>;
  setKeywordSuggestions: Dispatch<SetStateAction<Set<string>>>;
};

type GetKeywordSuggestionsResponse =
  | {
      status: "success";
      result: services.IGenerateKeywordIdeaResult[];
    }
  | {
      status: "failed";
      errorMessage: string;
    };

export function KeywordTable({
  keyword,
  setKeywordSuggestions,
  keywordSuggestions,
}: Props) {
  const { data, isError, isFetching, status, isLoading, isSuccess } = useQuery(
    ["getKeywordSuggestions"],
    () => getKeywordSuggestions(keyword)
  );

  if (isLoading)
    return (
      <div className="flex flex-col space-y-6 items-center w-full sm:max-w-xs md:max-w-sm lg:max-w-xl p-8 border-2 rounded-lg">
        <div role="status" className="animate-pulse mb-4">
          <div className="h-2.5 bg-lightGrey rounded-full w-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (isError) return <div>Sorry. Error.</div>;

  if (data.status === "success") {
    return (
      <div className="flex flex-col space-y-6 items-center w-full sm:max-w-xs md:max-w-sm lg:max-w-xl p-8 border-2 rounded-lg">
        {Array.from(keywordSuggestions).map((item) => (
          <div key={item}>{item}</div>
        ))}
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Keyword</th>
              <th>Avg. Monthly Volume</th>
              <th>Competition</th>
            </tr>
          </thead>
          <tbody>
            {data.result.map((keyword) => {
              return (
                <tr
                  key={keyword.text}
                  onClick={() => {
                    if (
                      typeof keyword.text === "string" &&
                      keyword.text !== undefined &&
                      keyword.text !== null &&
                      keywordSuggestions.size <= 2
                    ) {
                      setKeywordSuggestions((prevState) => {
                        return new Set(prevState).add(keyword.text!);
                      });
                    }
                  }}
                >
                  <td>{keyword.text}</td>
                  <td>{keyword.keyword_idea_metrics?.avg_monthly_searches}</td>
                  <td>
                    {keyword.keyword_idea_metrics?.competition_index} / 100
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
  return <div>Neither Error, Loading, or Data</div>;
}

async function getKeywordSuggestions(
  keyword: string
): Promise<GetKeywordSuggestionsResponse> {
  try {
    const response = await fetch("/api/get-keyword-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: keyword,
      }),
    });

    return {
      status: "success",
      result: (await response.json()) as services.IGenerateKeywordIdeaResult[],
    };
  } catch (e) {
    console.log(e);
    return {
      status: "failed",
      errorMessage: JSON.stringify(JSON.stringify(e)),
    };
  }
}
