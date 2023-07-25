import { Table } from "@mui/joy";
import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "google-ads-api";

type Props = {
  keyword: string;
  keywordSuggestions: Set<string>;
  setKeywordSuggestions: Dispatch<SetStateAction<Set<string>>>;
};

export function BasicTable({
  keyword,
  setKeywordSuggestions,
  keywordSuggestions,
}: Props) {
  const { data, isError, isFetching, status, isLoading, isSuccess } = useQuery(
    ["getKeywordSuggestions"],
    () => getKeywordSuggestions(keyword),
    {
      // enabled: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Sorry. Error.</div>;

  if (data && data.status === "success") {
    return (
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
                    keyword.text !== null
                  ) {
                    setKeywordSuggestions((prevState) => {
                      console.log("PREVIOUS STATE: ", prevState);
                      return new Set(prevState).add(keyword.text!);
                    });
                  }
                  console.log(keywordSuggestions);
                }}
              >
                <td>{keyword.text}</td>
                <td>{keyword.keyword_idea_metrics?.avg_monthly_searches}</td>
                <td>{keyword.keyword_idea_metrics?.competition_index} / 100</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
  return <div>Neither Error, Loading, or Data</div>;
}

async function getKeywordSuggestions(
  keyword: string
): Promise<GetKeywordSuggestionsResponse> {
  try {
    const response = await fetch("/api/getKeywords", {
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

type GetKeywordSuggestionsResponse =
  | {
      status: "success";
      result: services.IGenerateKeywordIdeaResult[];
    }
  | {
      status: "failed";
      errorMessage: string;
    };
