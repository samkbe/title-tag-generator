import type { NextApiResponse } from "next";
import OpenAI from "openai";
import {
  GetKeywordResults,
  GetTagsRequest,
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
      res.status(200).json(
        await getCohereResult({
          keyword,
          url,
          companyName,
          llm,
        })
      );
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

async function getCohereResult({
  url,
  keyword,
  companyName,
  llm,
}: GetKeywordResults): Promise<GeneratedKeywordResponse> {
  const prompt = `Act as an SEO expert. Generate an optimized title tag STRICTLY under 60 text characters and a description tag STRICTLY under 155 text characters with the keyword "${keyword}" for the company ${companyName}. Do not digress from the maximum character requirements. Their website is ${url}. Include the company name at the end of the title tag, not the beginning. Provide the title tag and description tag strictly in the following format without any other text:

  Title Tag: [title]
  Description Tag: [description]`;

  const body = JSON.stringify({
    prompt,
    model: "command-nightly",
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.1,
    return_likelihoods: "NONE",
    stream: false,
  });

  const response = await fetch(process.env.COHERE_API_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body,
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    const text = jsonResponse.generations?.[0].text;
    const trimmedText = text.trim();
    const lines = trimmedText.split("\n");
    const titleTag = lines[0].replace("Title Tag: ", "");
    const descriptionTag = lines[1].replace("Description Tag: ", "");
    return {
      titleTag,
      descriptionTag,
      keyword,
      llm,
    };
  } else {
    throw new Error("Cohere API request error");
  }
}
