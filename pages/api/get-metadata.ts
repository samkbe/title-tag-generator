import type { NextApiResponse } from "next";
import OpenAI from "openai";
import {
  GetMetaDataArgs,
  ExtendedNextApiRequest,
  GetMetadataResponse,
  GeneratedKeyword,
} from "../../types";

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GetMetadataResponse>
) {
  if (req.method !== "POST") {
    res.status(400);
    res.end();
  }
  const { keywords, url, companyName } = req.body;

  try {
    if (keywords.length > 3) {
      throw new Error("Max keywords are 3");
    }

    const generatedKeywords: GeneratedKeyword[] = await Promise.all(
      keywords.map((keyword) => getMetaData({ keyword, url, companyName }))
    );

    res.status(200).json({
      __typename: "success",
      url,
      generatedKeywords,
    });
  } catch (e) {
    res.status(400).json({
      __typename: "failed",
      message: JSON.stringify(e),
    });
  }
}

async function getMetaData({
  url,
  keyword,
  companyName,
}: GetMetaDataArgs): Promise<GeneratedKeyword> {
  const content = `Act as an SEO expert. Create an SEO plan for a company given the following information: Their target keyword is "${keyword}" their company name is: "${companyName}", and their website url is: "${url}".`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
    tools: [
      {
        type: "function",
        function: {
          name: "createSeoPlan",
          description:
            "Creates an SEO plan based on the title tage and description tag of a webpage",
          parameters: {
            type: "object",
            properties: {
              titleTag: {
                type: "string",
                description:
                  "The optimized title tag for their webpage that is strictly under 60 characters and contains their desired keyword",
              },
              descriptionTag: {
                type: "string",
                description:
                  "The optimized description tag for their webpage that is strictly under 155 characters",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const validCompletion =
    response?.choices?.[0].message.tool_calls?.[0].function.arguments;

  if (validCompletion) {
    const parsedCompletion = JSON.parse(validCompletion);
    return {
      keyword,
      ...parsedCompletion,
    };
  } else {
    throw new Error("Open API request error");
  }
}
