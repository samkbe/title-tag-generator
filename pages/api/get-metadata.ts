import type { NextApiResponse } from "next";
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";
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
  console.log("INITIATED: ", req.body);

  if (req.method !== "POST") {
    res.status(400);
    res.end();
  }
  const { keywords, url, companyName } = req.body;

  if (keywords.length > 3) {
    res.status(400).json({
      __typename: "failed",
      message: "Max keywords are 3",
    });
  }
  try {
    const generatedKeywords: GeneratedKeyword[] = [];
    try {
      for (let i = 0; i < keywords.length; i++) {
        const data = await getMetaData({
          keyword: keywords[i],
          url: url,
          companyName: companyName,
        });

        if (!data) throw new Error();

        generatedKeywords.push({
          keyword: keywords[i],
          options: data.metaDataArray,
        });
      }
      res.status(200).json({
        __typename: "success",
        url: url,
        generatedKeywords: generatedKeywords,
      });
    } catch (e) {
      res.status(400).json({
        __typename: "failed",
        message: JSON.stringify(e),
      });
    }
  } catch (e) {
    res.status(400).json({
      __typename: "failed",
      message: JSON.stringify(e),
    });
  }
}

//This parses and formats the Open AI API response
function extract(response: CreateCompletionResponse) {
  return {
    __typename: "success",
    metaDataArray: response.choices.map((choice) => {
      if (choice.text) {
        const responseText = choice.text.trim();
        const lines = responseText.split("\n");
        const titleTag = lines[0].replace("Title Tag: ", "");
        const descriptionTag = lines[1].replace("Description Tag: ", "");
        return {
          descriptionTag: descriptionTag,
          titleTag: titleTag,
        };
      } else {
        throw new Error("Open AI API response error");
      }
    }),
  };
}

//This prompts OpenAPI for metadata
async function getMetaData({ url, keyword, companyName }: GetMetaDataArgs) {
  const prompt = `Act as an SEO expert. Generate an optimized title tag strictly under 60 characters and a description tag strictly under 155 characters with the keyword "${keyword}" for the company ${companyName}. Their website is ${url}. Include the company name at the end of the title tag, not the beginning. Provide the title tag and description tag strictly in the following format:

  Title Tag: [title]
  Description Tag: [description]`;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const openApiResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 100,
      n: 3,
    });
    const formattedData = extract(openApiResponse.data);
    return formattedData;
  } catch (e) {
    console.log(e);
  }
}
