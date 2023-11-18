import type { NextApiResponse } from "next";
import OpenAI from "openai";
import {
  GetKeywordResults,
  GetTagsRequest,
  GetMetadataResponse,
  GeneratedKeywordResponse,
} from "../../types";

export default async function handler(
  req: GetTagsRequest,
  res: NextApiResponse<GeneratedKeywordResponse>
) {
  if (req.method !== "GET") {
    res.status(400);
    res.end();
  }

  const { keyword, url, companyName, llm } = req.query;

  try {
    if (llm === "open-ai") {
      res.status(200).json(
        await getOpenAiResults({
          keyword,
          url,
          companyName,
          llm,
        })
      );
    } else if (llm === "cohere") {
    } else if (llm === "fireworks") {
    } else {
      throw Error();
    }
  } catch (e) {
    res.status(400);
    res.end();
  }
}

async function getOpenAiResults({
  url,
  keyword,
  companyName,
  llm,
}: GetKeywordResults): Promise<GeneratedKeywordResponse> {
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
      llm,
      keyword,
      ...parsedCompletion,
    };
  } else {
    throw new Error("Open API request error");
  }
}
