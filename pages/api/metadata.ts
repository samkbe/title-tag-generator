import type { NextApiResponse } from "next";
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";
import {
  GetMetaDataArgs,
  ExtendedNextApiRequest,
  MetaTagsResponse,
} from "../../types";

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
    console.log("ERROR", e);
  }
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<MetaTagsResponse>
) {
  const { keyword, url, companyName } = req.body;
  try {
    getMetaData(req.body).then((data) => {
      if (data) {
        res.status(200).json({
          __typename: "success",
          url: url,
          options: data.metaDataArray,
        });
      } else {
        throw new Error();
      }
    });
  } catch (e) {
    res.status(400).json({
      __typename: "failed",
      message: e as string,
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
