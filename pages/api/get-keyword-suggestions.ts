import type { NextApiResponse, NextApiRequest } from "next";
import { GoogleAdsApi } from "google-ads-api";
import { getToken } from "next-auth/jwt";

interface KeywordNextApiRequest extends NextApiRequest {
  body: {
    keyword: string;
  };
}

export default async function handler(
  req: KeywordNextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).json("Only POST requests accepted");
    res.end();
  }
  const { keyword } = req.body;
  const token = await getToken({ req });

  if (token) {
    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      developer_token: process.env.GOOGLE_DEVELOPER_TOKEN as string,
    });

    const customer = client.Customer({
      customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
      refresh_token: token?.refresh_token,
    });

    try {
      const keywordIdeas = await customer.keywordPlanIdeas.generateKeywordIdeas(
        {
          customer_id: "7834575692",
          geo_target_constants: [],
          page_size: 10,
          page_token: "",
          keyword_annotation: [],
          keyword_plan_network: "GOOGLE_SEARCH",
          toJSON: () => {
            return { test: 1 };
          },
          include_adult_keywords: false,
          keyword_seed: {
            keywords: [keyword],
          },
        }
      );
      res.status(201).json(keywordIdeas);
      res.end();
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
      res.end();
    }
  } else {
    res.status(400).json("Sorry, Something went wrong");
    res.end();
  }
}
