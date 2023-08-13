import { openAiStructuredResponse } from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { Quiz } from "../../../global";

type Error = {
  error: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Quiz[] | Error>
) {
  const { functionCall, query, task } = req.body;
  try {
    const response = await openAiStructuredResponse({
      functionCall,
      query,
      task,
    });
    res.status(200).json(response?.questions);
  } catch (error) {
    res.status(500).json({ error });
  }
}
