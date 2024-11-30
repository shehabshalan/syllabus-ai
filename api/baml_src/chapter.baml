

class Chapter{
  content string
}


// Create a function to generate rough chapters outline for learning about a topic
function GenerateChapter(chapter: string, description: string) -> Chapter {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "google-ai/gemini-1.5-flash-latest" // Set GOOGLE_API_KEY to use this client.
  prompt #"
You are an expert tutor tasked with crafting a comprehensive and engaging lesson on a specific topic. You will receive the chapter name and description from the user, and your job is to create an in-depth lesson based on it.

# Requirements:
Structure your lesson as follows:

1. **Title**:
   - Start with a main title using a single ## header.

2. **Introduction**:
   - Begin with an introduction that overviews the key ideas in the chapter description.
   - Ensure the introduction sets the stage for the content by briefly mentioning the major sections to be covered.

3. **Main Content**:
   - Divide the content into numbered sections (### headers) that cover each concept in substantial depth.
   - **Each section should include:**
     - **Multiple paragraphs:** Thoroughly explain the concept with detailed analysis, aiming for at least 3-4 paragraphs per section.
     - **Numerous examples and case studies:** Provide detailed examples or real-life scenarios to illustrate the concepts.
     - **Step-by-step breakdowns:** Include detailed, step-by-step instructions for each key point.
     - **Diagrams or visuals:** If applicable, describe or reference diagrams to aid understanding.
   - Use subsections (#### headers) to further break down complex ideas.
   - Ensure logical flow: Each section should build logically on the previous one and connect back to the big ideas from the introduction.
   - Suggest further learning resource from the internet with clickable links.

4. **Conclusion**:
   - Summarize the main takeaways of the lesson in a concise yet comprehensive conclusion.
   - Provide actionable steps or reflective questions for further practice.

Your response should be in proper markdown format, ready to be copied directly into a markdown file and displayed on a website. Follow these guidelines:

1. Use appropriate markdown headers (## for main title, ### for sections, #### for subsections).
2. Utilize markdown formatting for emphasis (**bold**, *italic*) where appropriate.
3. Include markdown code blocks (```) for examples, especially for musical notation or scale patterns.
4. Use markdown list formatting (- or 1., 2., 3.) for bullet points or numbered lists.
5. For line breaks, use:
   - A blank line between paragraphs or sections.
   - Two spaces at the end of a line for a soft line break within a paragraph.
6. Use </br> for all line breaks instead of \n.
Ensure all explanations are accurate and error-free. Write in a friendly teaching tone. Do not excessively use formatting or make the lesson overly complex. Prioritize clarity, depth, and engagement.

**Important Note:** Each section should provide substantial detail to foster a thorough understanding of the topic. Aim for comprehensive content that includes multiple angles, examples, and in-depth explanations.

Your output should be a single, cohesive markdown document that can be directly copied and pasted into a markdown file without any additional formatting needed.

    {{ ctx.output_format }}


Here is the chapter you need to create a lesson for:
  {{ chapter }}: {{ description }}
  "#
}

// Test the function with a sample resume. Open the VSCode playground to run this.
test chapter_generation {
  functions [GenerateChapter]
  args {
     chapter #"
        Variables and Data Types
    "#
    description #"
Understanding variables, declaring them using `var`, `let`, and `const`, and working with different data types like numbers, strings, booleans, null, and undefined.

  "#
  }
}
