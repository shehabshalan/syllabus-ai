import { openAiUnstructuredResponse } from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";

type Error = {
  error: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  const { query, task } = req.body;
  try {
    const response = await openAiUnstructuredResponse({
      query,
      task,
    });
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ error });
  }
}
