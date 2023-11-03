import { openAiUnstructuredResponse } from "@/utils/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Error } from "../../../global";

export const config = {
  runtime: "edge",
  regions: ["iad1"],
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
    res.status(500).json({ error });
  }
}
