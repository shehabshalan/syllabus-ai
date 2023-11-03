import { openAiStructuredResponse } from "@/utils/openai";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Chapter, Error } from "../../../global";

export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

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
    NextResponse.json(response?.chapters);
  } catch (error) {
    NextResponse.json({ error });
  }
}
