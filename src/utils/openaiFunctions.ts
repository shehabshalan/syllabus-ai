import { ChatCompletionFunctions } from "openai";

export const CHAPTER_FUNCTION: ChatCompletionFunctions = {
  name: "get_chapters",
  description: "Set a list of all chapters.",
  parameters: {
    type: "object",
    properties: {
      chapters: {
        type: "array",
        description: "A list of chapters.",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the chapter.",
            },
            description: {
              type: "string",
              description: "The description of the chapter.",
            },
            slug: {
              type: "string",
              description: "The slug of the chapter.",
            },
          },
          required: ["name", "description", "slug"],
        },
      },
    },
  },
};
