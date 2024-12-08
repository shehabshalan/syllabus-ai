// Defining a data model.


class ChapterOutline {
  name string
  description string
  slug string

}

class Chapters {
  topic string
  chapters ChapterOutline[]
}


// Create a function to generate rough chapters outline for learning about a topic
function GenerateChapters(topic: string) -> Chapters {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "google-ai/gemini-1.5-flash-latest" // Set GOOGLE_API_KEY to use this client.
  prompt #"
    You are a course creator tasked with developing high-quality course chapters based on a given topic. 
    Imagine you want to teach someone about it and you want to recommend what gradual topics should be covered. From the basics to the advanced topics.

    For each chapter, provide:
    1. **Name**: A concise title for the chapter.
    2. **Description**: A brief overview of what will be covered in the chapter.
    3. **Slug**: A URL-friendly version of the chapter title.

    ## Requirements:
    - Each chapter must serve as a prerequisite for the following chapter.
    - Ensure each chapter covers unique content.
    - Your main focus is to provide high-level descriptions and not the actual detailed content.
    - Maintain a logical flow from one chapter to the next.

    Here is the topic the user wants to learn about: {{ topic }}

    {{ ctx.output_format }}
  "#
}

// Test the function with a sample resume. Open the VSCode playground to run this.
test chapters_generation {
  functions [GenerateChapters]
  args {
    topic #"
        JavaScript
    "#
  }
}
