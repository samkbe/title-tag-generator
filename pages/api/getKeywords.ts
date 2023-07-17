import type { NextApiResponse, NextApiRequest } from "next";
import { GoogleAdsApi } from "google-ads-api";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    developer_token: process.env.GOOGLE_DEVELOPER_TOKEN as string,
  });

  const token = await getToken({ req });

  if (token) {
    const customer = client.Customer({
      customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
      refresh_token: token?.refresh_token,
    });

    try {
      // const customers = await client.listAccessibleCustomers(
      //   token?.refresh_token
      // );

      // // res.status(200).json(customers);

      customer.keywordPlanIdeas
        .generateKeywordIdeas({
          customer_id: "7834575692",
          geo_target_constants: [],
          page_size: 1,
          page_token: "",
          keyword_annotation: [],
          keyword_plan_network: "GOOGLE_SEARCH",
          toJSON: () => {
            return { test: 1 };
          },
          include_adult_keywords: false,
          keyword_seed: {
            keywords: ["go to market agency"],
          },
        })
        .then((results) => res.status(200).json(results))
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }

  res.status(200);
}
