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

export const QUIZ_FUNCTION: ChatCompletionFunctions = {
  name: "get_quiz",
  description: "Set a list of all quiz questions.",
  parameters: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        description: "A list of quiz questions.",
        items: {
          type: "object",
          properties: {
            question: {
              type: "string",
              description: "The question.",
            },
            options: {
              type: "array",
              description: "A list of options.",
              items: {
                type: "string",
              },
            },
            correctOptionIndex: {
              type: "number",
              description: "The index of the correct option.",
            },
          },
          required: ["question", "options", "correctOptionIndex"],
        },
      },
    },
  },
};
