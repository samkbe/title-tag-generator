import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi, CreateCompletionResponse } from "openai";

type GetMetaDataArgs = {
  url: string;
  keyword: string;
  companyName: string;
};
type Response = Success | Failed;
type Failed = {
  __typename: "failed";
  message: string;
};
type Success = {
  __typename: "success";
  url: string;
  options: Metadata[];
};
type Metadata = {
  titleTag: string;
  descriptionTag: string;
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    keyword: string;
    url: string;
    companyName: string;
  };
}

async function getMetaData({ url, keyword, companyName }: GetMetaDataArgs) {
  const prompt = `Act as an SEO expert. Generate an optimized title tag strictly under 60 characters and a description tag strictly under 155 characters with the keyword "${keyword}" for the company ${companyName}. Their website is ${url}. Include the company name at the end of the title tag. Please provide the title tag and description tag in the following format:

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
    });
    const formattedData = extract(openApiResponse.data);
    return formattedData;
  } catch (e) {
    console.log("ERROR", e);
  }
}

export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Response>
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
