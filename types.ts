import { NextApiRequest } from "next";

export type MetaTagsResponse = Success | Failed;
type Failed = {
  __typename: "failed";
  message: string;
};
type Success = {
  __typename: "success";
  url: string;
  options: MetaTag[];
};
type MetaTag = {
  titleTag: string;
  descriptionTag: string;
};
export type SerpProps = {
  titleTag: string;
  descriptionTag: string;
  url: string;
};
export type JSONresponse = {
  data: MetaTagsResponse;
};
export type GetMetaDataArgs = {
  url: string;
  keyword: string;
  companyName: string;
};
export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    keyword: string;
    url: string;
    companyName: string;
  };
}
