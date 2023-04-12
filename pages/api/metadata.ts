import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type GetMetaDataArgs = {
  url: string;
  keyword: string;
  companyName: string;
};
type Data = {
  url: string;
  options: Metadata[];
};
type Metadata = {
  titleTag: string;
  descriptionTag: string;
};

async function getMetaData({ url, keyword, companyName }: GetMetaDataArgs) {
  const prompt = `Generate an optimized title tag and description tag for the company ${companyName} with the keyword ${keyword}. Their website is ${url}.`;

  // const prompt = [
  //   {
  //     role: "system",
  //     content:
  //       "You are an AI language model specialized in SEO. Generate an optimized title tag and description tag for the user.",
  //   },
  //   {
  //     role: "user",
  //     content: `Generate an optimized title tag and description tag for the company ${companyName} with the keyword ${keyword}. Their website is ${url}.`,
  //   },
  // ];

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);
    const data = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 100,
    });
    console.log("SUCCESS", data.data.choices);
  } catch (e) {
    console.log("ERROR", e);
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { keyword, url, companyName } = req.body;
  getMetaData({ keyword: keyword, url: url, companyName: companyName })
    .then((data) => console.log(""))
    .catch((e) => console.log(""));
}
