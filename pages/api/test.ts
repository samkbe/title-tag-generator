import type { NextApiResponse, NextApiRequest } from "next";
import { GoogleAdsApi } from "google-ads-api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    developer_token: process.env.GOOGLE_DEVELOPER_TOKEN as string,
  });

  client
    .listAccessibleCustomers(
      "1//0fg6u8GZNCJL9CgYIARAAGA8SNwF-L9IrmSFkOZHikBCDYCh90ThlfNus4XNjaVelVOMqKCVgQ9NqhBpYzCuwVMDvw2m_OL8bwYw"
    )
    .then((arr) => {
      console.log("Accessible Customers: ", arr);
    })
    .catch((e) => console.log(e));

  // const customer = client.Customer({
  //   customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
  //   refresh_token: "",
  // });

  // client
  //   .listAccessibleCustomers(process.env.GOOGLE_REFRESH_TOKEN as string)
  //   .then((data) => console.log(data))
  //   .catch((e) => console.log(e));

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
