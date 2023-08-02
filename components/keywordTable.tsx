import { Table } from "@mui/joy";
import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "google-ads-api";
import LoadingIcon from "../public/Pulse-1s-200px.svg";
import Image from "next/image";

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
  const {
    data,
    isError,
    isFetching,
    status,
    isLoading,
    isSuccess,
    isRefetching,
  } = useQuery(["getKeywordSuggestions"], () => getKeywordSuggestions(keyword));

  if (isFetching || isRefetching || isLoading)
    return <Image alt="loading-icon" src={LoadingIcon} />;

  if (isError) return <div>Sorry. Error.</div>;

  if (data.status === "success") {
    return (
      <>
        <div className="w-full flex justify-center flex-row min-h-[15%] pb-4 transition-all">
          {Array.from(keywordSuggestions).map((item) => (
            <div
              className="border-solid border-2 rounded-md border-logoColor p-2 transition-all pl-4"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col space-y-6 items-center w-full sm:max-w-xs md:max-w-sm lg:max-w-xl p-8 border-2 rounded-lg">
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
                  <tr key={keyword.text}>
                    <td
                      onClick={() => {
                        setKeywordSuggestions((prevState) => {
                          let newState = new Set(prevState);
                          if (newState.has(keyword.text!)) {
                            newState.delete(keyword.text!);
                          } else if (keywordSuggestions.size <= 2) {
                            newState.add(keyword.text!);
                          }
                          return newState;
                        });
                      }}
                    >
                      {keyword.text}
                    </td>
                    <td>
                      {keyword.keyword_idea_metrics?.avg_monthly_searches}
                    </td>
                    <td>
                      {keyword.keyword_idea_metrics?.competition_index} / 100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
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
