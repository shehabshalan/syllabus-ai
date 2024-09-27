import { ChatCompletionFunctions } from "openai";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface Task {
  name: string;
  slug: string;
}

export interface Chapter {
  name: string;
  slug: string;
  description: string;
}

export interface Quiz {
  question: string;
  correctOptionIndex: number;
  options: string[];
}

export interface CallOpenAIWithFunctionParams {
  task: string;
  query: string;
  functionCall: ChatCompletionFunctions;
}
export interface CallOpenAIParams {
  task: string;
  query: string;
}
export interface Error {
  error: unknown;
}
