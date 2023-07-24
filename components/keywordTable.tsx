import { Table } from "@mui/joy";
import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "google-ads-api";

type Props = {
  keyword: string;
  keywordSuggestions: string[];
  setKeywordSuggestions: Dispatch<SetStateAction<string[]>>;
};

export function BasicTable({ keyword, setKeywordSuggestions }: Props) {
  const { data, isError, isFetching, status, isLoading, isSuccess } = useQuery(
    ["getKeywordSuggestions"],
    () => getKeywordSuggestions(keyword),
    {
      // enabled: false,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Sorry. Error.</div>;

  if (data) {
    return (
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Dessert (100g serving)</th>
            <th>Calories</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frozen yoghurt</td>
            <td>159</td>
            <td>6</td>
            <td>24</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Ice cream sandwich</td>
            <td>237</td>
            <td>9</td>
            <td>37</td>
            <td>4.3</td>
          </tr>
          <tr>
            <td>Eclair</td>
            <td>262</td>
            <td>16</td>
            <td>24</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Cupcake</td>
            <td>305</td>
            <td>3.7</td>
            <td>67</td>
            <td>4.3</td>
          </tr>
          <tr>
            <td>Gingerbread</td>
            <td>356</td>
            <td>16</td>
            <td>49</td>
            <td>3.9</td>
          </tr>
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
      result: (await response.json()) as services.GenerateKeywordIdeaResponse,
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
      result: services.GenerateKeywordIdeaResponse;
    }
  | {
      status: "failed";
      errorMessage: string;
    };
