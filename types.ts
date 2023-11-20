import { NextApiRequest } from "next";

export type GetTagsResponse = {};

export type GetMetadataResponse =
  | {
      __typename: "failed";
      message: string;
    }
  | {
      __typename: "success";
      url: string;
      generatedKeywords: GeneratedKeyword[];
    };

export type GeneratedKeywordResponse = {
  keyword: string;
  titleTag: string;
  descriptionTag: string;
  llm: "open-ai" | "cohere" | "fireworks";
};

export type GeneratedKeyword = {
  keyword: string;
  titleTag: string;
  descriptionTag: string;
};

export type SerpTileProps = {
  titleTag: string;
  descriptionTag: string;
};

export type JSONresponse = {
  data: GetMetadataResponse;
};
export type GetMetaDataArgs = {
  url: string;
  keyword: string;
  companyName: string;
};

export type GetKeywordResults = {
  url: string;
  keyword: string;
  companyName: string;
  llm: "open-ai" | "cohere";
};

export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    keywords: string[];
    url: string;
    companyName: string;
  };
}
export interface GetTagsRequest extends NextApiRequest {
  query: {
    keyword: string;
    url: string;
    companyName: string;
    llm: "open-ai" | "cohere";
  };
}
