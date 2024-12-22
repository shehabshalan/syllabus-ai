

class ChatResponse{
  response string
}


// Create a function to generate rough chapters outline for learning about a topic
function ChatChapter(content: string, message: string, history: string) -> ChatResponse {
  // Specify a client as provider/model-name
  // you can use custom LLM params with a custom client name from clients.baml like "client CustomHaiku"
  client "google-ai/gemini-1.5-flash-latest" // Set GOOGLE_API_KEY to use this client.
  prompt #"
You are an expert tutor in any topic. A student will ask you questions about a chapter they are studying at the moment. The chapter content will be provided to you along with history of interaction between you and the student.
Your job is to respond to the user's queries in a friendly and informative manner. Try to be as fun as possible and provide detailed explanations wheenver necessary or less verbose answers whenever necessary to help the student understand the chapter better.

    {{ ctx.output_format }}


Here the full chapter content:
# CHAPTER CONTENT START
  {{ content }}


# CHAPTER CONTENT END

User current message: 
message: {{ message }}


Here the previous messages with this user where bot is your responses and user is the user messages:

{{ history }}

  "#
}

// Test the function with a sample resume. Open the VSCode playground to run this.
test chat_chapter {
  functions [ChatChapter]
  args {
     content #"
        The Spark: Finding Your Story Idea
Introduction:

This chapter is all about igniting that creative fire—finding your story idea. We'll explore a range of techniques to help you brainstorm effectively, identify the perfect genre for your story, develop compelling characters and premises, and finally, consider various story structures to give your narrative shape. We'll cover brainstorming methods, genre selection, character development, premise crafting, and a look at popular story structures.

1. Brainstorming Techniques: Unleashing Your Creative Potential
Finding a story idea can feel daunting, but with the right brainstorming techniques, you can unlock a wealth of possibilities. Don't strive for perfection at this stage; the goal is to generate ideas, no matter how wild or seemingly impractical. Let's explore several proven techniques:

Freewriting: Set a timer (e.g., 10 minutes) and write continuously without stopping, editing, or censoring yourself. Let your thoughts flow onto the page. You might be surprised at the gems you uncover.
Example: Start with a single word – “Forest” – and just keep writing anything that comes to mind. You might end up writing about a lost child, a hidden treasure, or a mystical creature living within. </br>

Mind Mapping: Start with a central idea (your story's core concept) and branch out with related ideas, characters, settings, and plot points. Use visual connections to see how different elements relate.
Example: If your central idea is “revenge,” branch out to themes like betrayal, justice, family, consequences, different settings (a city, a remote island), and various characters involved.

SCAMPER: This technique prompts you to consider various modifications to an existing idea: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse. Applying SCAMPER to a typical superhero story could involve substituting powers, combining heroes, adapting the setting, and more.
Further Exploration: Mind Mapping Techniques and SCAMPER
The key is to experiment with different techniques and find what works best for you. Don't be discouraged if your initial brainstorming doesn't produce a fully formed story—it's the starting point, not the finish line. </br>

2. Identifying Your Genre: Finding the Right Fit
Genre significantly influences your story's structure, tone, and expected elements. Understanding genre conventions will help you tailor your story to appeal to your target audience. Some key genres include:

Fantasy: Involves magic, mythical creatures, and otherworldly settings.
Science Fiction: Explores futuristic technology, space travel, and societal changes.
Mystery: Focuses on solving crimes and unraveling secrets.
Romance: Centers on the development of a romantic relationship.
Thriller: Builds suspense and keeps the reader on the edge of their seat.
Horror: Aims to scare and unsettle the reader.
Choosing the right genre is crucial. If you write a romance story with horror elements, the audience might be confused or alienated. Consider what elements you want to emphasize in your story and what appeals most to you as a writer.

Example: A story about a detective solving a murder in a futuristic city could blend mystery and science fiction.

Example: A story about a young woman battling a dragon might be considered fantasy.

It's also possible to blend genres to create a unique and compelling story. Think of it like mixing different colors to create a new shade. Consider how different genres would interact to create a distinctive narrative.

3. Developing Compelling Characters and Premises
Your characters are the heart of your story, and a strong premise will drive the narrative. Let's delve into both:

3.1. Character Development
Create characters that are believable, relatable, and engaging. Give each character a clear motivation, flaws, strengths, and a compelling backstory. Consider using character profiles to organize your ideas. Think about what makes them tick, what their desires are, and what they fear.

Example: A seemingly perfect protagonist might secretly harbor deep insecurities, creating internal conflict and driving their actions.

3.2. Premise Crafting
The premise is the core idea of your story—the central conflict or problem that drives the plot. It should be concise, intriguing, and captivating. A strong premise will immediately hook readers and leave them wanting more.

Example: A simple premise might be “A detective must solve a murder before the killer strikes again.” A more complex premise might be, “A young woman discovers a hidden power that connects her to an ancient prophecy, forcing her to choose between her own life and the fate of the world.”

A well-defined premise, coupled with compelling characters, will provide a solid foundation for your story.

4. Exploring Different Story Structures
Choosing the right structure is crucial for pacing and clarity. Popular story structures include:

Linear: Events unfold chronologically from beginning to end.
Nonlinear: Events are presented out of chronological order, often using flashbacks or flash-forwards.
In Medias Res: The story begins in the middle of the action.
Circular: The story ends where it begins, often with a sense of completion or closure.
Experiment with different structures to find what best suits your story and its message. A nonlinear structure can create suspense, while a linear structure offers a clear and straightforward narrative.

Example: A thriller might use in medias res to immediately grab the reader's attention, while a coming-of-age story might benefit from a linear structure to showcase the character's growth.

Further Learning: Story Structure
Conclusion:

Finding your story idea is a journey of exploration and discovery. By employing effective brainstorming techniques, carefully selecting your genre, developing compelling characters and premises, and choosing a suitable story structure, you’ll be well-equipped to bring your unique narrative to life. Remember to experiment, revise, and refine your ideas until you are satisfied. Now, go forth and write! What story are you ready to tell? Consider starting with a freewriting exercise, focusing on one specific aspect of your preferred genre that excites you. Reflect on your process – what did you find most challenging, and what worked best for you?
    "#
    message #"
        Can you explain the SCAMPER technique in more detail?
  "#

  history #"
    [
      {
        "message": "Can you explain the SCAMPER technique in more detail?",
        "user_type": "user"
      }
    ]

  "#

  }
}
