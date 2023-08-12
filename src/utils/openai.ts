import { Configuration, OpenAIApi } from "openai";
import { getPrompt } from "./promptManager";
import { CallOpenAIParams, CallOpenAIWithFunctionParams } from "../../global";

const MODEL = "gpt-3.5-turbo-0613";
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateChapters = async ({
  task,
  query,
  functionCall,
}: CallOpenAIWithFunctionParams): Promise<
  typeof functionCall.parameters | undefined
> => {
  const prompt = getPrompt(task);
  const template = `
    ${prompt} 
    user query:${query}
    `;
  try {
    const response = await openai.createChatCompletion({
      model: MODEL,
      messages: [{ role: "user", content: template }],
      functions: [functionCall],
      function_call: { name: functionCall.name },
    });
    const content = response.data.choices[0].message?.function_call?.arguments;
    if (content) {
      return JSON.parse(content);
    }
  } catch (e: any) {
    throw new Error(e);
  }
};

export const generateLessonFromChapter = async ({
  task,
  query,
}: CallOpenAIParams): Promise<string | undefined> => {
  const prompt = getPrompt(task);
  const template = `
    ${prompt} 
    user query:${query}
    `;
  try {
    const response = await openai.createChatCompletion({
      model: MODEL,
      messages: [{ role: "user", content: template }],
    });
    return response.data.choices[0].message?.content;
  } catch (e: any) {
    throw new Error(e);
  }
};
