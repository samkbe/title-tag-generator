import type { NextApiResponse, NextApiRequest } from "next";
import { inspect } from "util";
import { parseString } from "xml2js";

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

  try {
    const response = await fetch(sitemapUrl);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const xml = await response.text();

    parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(inspect(result, false, null));
    });
    res.send(200);
  } catch (e) {
    res.status(200);
  }
}
