import { openAiStructuredResponse } from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Chapter, Error } from "../../../global";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Chapter[] | Error>
) {
  const { functionCall, query, task } = req.body;
  try {
    const response = await openAiStructuredResponse({
      functionCall,
      query,
      task,
    });
    res.status(200).json(response?.chapters);
  } catch (error) {
    res.json({ error });
  }
}
