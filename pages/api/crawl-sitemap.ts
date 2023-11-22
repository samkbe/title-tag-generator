import type { NextApiResponse, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { GoogleAdsApi, Customer } from "google-ads-api";
import { parseString, Parser } from "xml2js";

interface PostSitemapApiRequest extends NextApiRequest {
  body: {
    sitemapUrl: string;
  };
}

export default async function handler(
  req: PostSitemapApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).send("Invalid request method");
  }

  const { sitemapUrl } = req.body;

  const token = await getToken({ req });

  try {
    if (!token) throw new Error("No JWT Token");

    const response = await fetch(sitemapUrl);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const xml = await response.text();

    const parser = new Parser();
    const parsed = await parser.parseStringPromise(xml);
    const urls = parsed.urlset.url;

    if (!urls) throw new Error("Error in fetching urls from sitemap");

    //Should Validate the sitemap.xml here

    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
      developer_token: process.env.GOOGLE_DEVELOPER_TOKEN as string,
    });

    const customer = client.Customer({
      customer_id: process.env.GOOGLE_CUSTOMER_ID as string,
      refresh_token: token?.refresh_token,
    });

    // const test = await getKeywordsFromUrl(customer, urls[0].loc[0]);

    // const resolved = await Promise.all(
    //   urls.map(async (url: { loc: string[]; lasMod: string[] }) => {
    //     return await getKeywordsFromUrl(customer, url.loc[0]);
    //   })
    // );

    const resolved = [];

    for (const url of urls) {
      const result = await getKeywordsFromUrl(customer, url.loc[0]);
      resolved.push(result);
      console.log(result);
      await delay(1500);
    }

    console.log(resolved);

    res.status(200);
  } catch (e) {
    console.log("ERROR", e);
    res.status(200);
  }
}

async function getKeywordsFromUrl(customer: Customer, url: string) {
  const keywordIdeas = await customer.keywordPlanIdeas.generateKeywordIdeas({
    customer_id: "7834575692",
    geo_target_constants: [],
    page_size: 10,
    page_token: "",
    keyword_annotation: [],
    keyword_plan_network: "GOOGLE_SEARCH",
    toJSON: () => {
      return { dontKnowWhatThisIs: 1 };
    },
    include_adult_keywords: false,
    url_seed: {
      url,
    },
  });

  return keywordIdeas;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
