import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

async function getMetaData() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
  });
}

type Data = {
  url: string;
  options: Metadata[];
};
type Metadata = {
  titleTag: string;
  descriptionTag: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Query the OpenAI API
}
