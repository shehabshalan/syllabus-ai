// Defining a data model.


class Chapter{
  name string
  description string
  slug string

}

class Chapters {
  topic string
  chapters Chapter[]
}


// Create a function to generate rough chapters outline for learning about a topic
function GenerateChapers(topic: string) -> Chapters {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "google-ai/gemini-1.5-flash-latest" // Set GOOGLE_API_KEY to use this client.
  prompt #"
    Generate chapter names for learning about {{ topic }} with a brief description.
    Imagine you want to teach someone about it and you want to recommend what gradual topics should be covered. From the basics to the advanced topics.

    {{ ctx.output_format }}
  "#
}

// Test the function with a sample resume. Open the VSCode playground to run this.
test chapter_generation {
  functions [GenerateChapers]
  args {
    topic #"
        JavaScript
    "#
  }
}
