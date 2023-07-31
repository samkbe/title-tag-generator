import { NextApiRequest } from "next";

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

export type GeneratedKeyword = {
  keyword: string;
  options: {
    titleTag: string;
    descriptionTag: string;
  }[];
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
export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    keywords: string[];
    url: string;
    companyName: string;
  };
}
