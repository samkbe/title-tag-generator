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

  res.json(token);

  // const customer = client.Customer({
  //   customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
  //   refresh_token:
  //     "1//0f8G6inYUe-tJCgYIARAAGA8SNwF-L9Ir-rfA65EHpsAbq8sJoHWwFGuFxexlVSVZLLup3udbSfBDea8AOlGDA3RaxNROkutR764",
  // });

  // try {
  //   customer.keywordPlanIdeas
  //     .generateKeywordIdeas({
  //       customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
  //       geo_target_constants: [],
  //       page_size: 1,
  //       page_token: "",
  //       keyword_annotation: [],
  //       keyword_plan_network: "GOOGLE_SEARCH",
  //       toJSON: () => {
  //         return { test: 1 };
  //       },
  //       include_adult_keywords: false,
  //       keyword_seed: {
  //         keywords: ["water Softener"],
  //       },
  //     })
  //     .then((results) => console.log(results))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // } catch (e) {
  //   console.log(e);
  //   res.status(400);
  // }

  res.status(200);
}
