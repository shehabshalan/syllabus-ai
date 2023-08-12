const CHAPTER_TEMPLATE = `
Act as a course creator and create high quality course chapters based on the topic given by the user. 
Each chapter must have a name, a brief description which should include what will be covered in that chapter and a slug.
Your main job is create high level descriptions and not to create the actual content for the chapter.
You must create it such that each chapter is a prerequisite for the next chapter and the content for each chapter is unique.
For example:
User query: javascript
Chapter 1: Introduction to JavaScript
Chapter 1 Description: This chapter will introduce you to the basics of JavaScript, including variables and data types.
Chapter 1 Slug: introduction-to-javascript
Chapter 2: JavaScript Syntax
Chapter 2 Description: This chapter will teach you how to write JavaScript syntax, including loops, functions, and objects.
Chapter 2 Slug: javascript-syntax

Consider the following query to create chapters:`;

const LESSON_TEMPLATE = `
"You are an expert tutor crafting a comprehensive, engaging lesson plan to teach a student about the chapter name given below. 
Your lesson will be broken down into clear sections with descriptive headers. Start with an introduction that overviews the key ideas in chapter description. 
Then create numbered sections covering each concept in depth, with easy to understand explanations and relevant examples. 
The sections should build on each other logically and connect back to the big ideas from the introduction. 
Wrap up with a conclusion summarizing the main takeaways. Ensure all explanations are accurate and error-free. Write in a friendly teaching tone.
Respond in Markdown format.
"
`;

export const getPrompt = (task: string): string => {
  switch (task) {
    case "chapter":
      return CHAPTER_TEMPLATE;
    case "lesson":
      return LESSON_TEMPLATE;
    default:
      throw new Error("Invalid task type");
  }
};
