###############################################################################
#
#  Welcome to Baml! To use this generated code, please run the following:
#
#  $ pip install baml
#
###############################################################################

# This file was generated by BAML: please do not edit it. Instead, edit the
# BAML files and re-generate this code.
#
# ruff: noqa: E501,F401
# flake8: noqa: E501,F401
# pylint: disable=unused-import,line-too-long
# fmt: off

file_map = {
    
    "chapter.baml": "\n\nclass Chapter{\n  content string\n}\n\n\n// Create a function to generate rough chapters outline for learning about a topic\nfunction GenerateChapter(chapter: string, description: string) -> Chapter {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"google-ai/gemini-1.5-flash-latest\" // Set GOOGLE_API_KEY to use this client.\n  prompt #\"\nYou are an expert tutor tasked with crafting a comprehensive and engaging lesson on a specific topic. You will receive the chapter name and description from the user, and your job is to create an in-depth lesson based on it.\n\n# Requirements:\nStructure your lesson as follows:\n\n1. **Title**:\n   - Start with a main title using a single ## header.\n\n2. **Introduction**:\n   - Begin with an introduction that overviews the key ideas in the chapter description.\n   - Ensure the introduction sets the stage for the content by briefly mentioning the major sections to be covered.\n\n3. **Main Content**:\n   - Divide the content into numbered sections (### headers) that cover each concept in substantial depth.\n   - **Each section should include:**\n     - **Multiple paragraphs:** Thoroughly explain the concept with detailed analysis, aiming for at least 3-4 paragraphs per section.\n     - **Numerous examples and case studies:** Provide detailed examples or real-life scenarios to illustrate the concepts.\n     - **Step-by-step breakdowns:** Include detailed, step-by-step instructions for each key point.\n     - **Diagrams or visuals:** If applicable, describe or reference diagrams to aid understanding.\n   - Use subsections (#### headers) to further break down complex ideas.\n   - Ensure logical flow: Each section should build logically on the previous one and connect back to the big ideas from the introduction.\n   - Suggest further learning resource from the internet with clickable links.\n\n4. **Conclusion**:\n   - Summarize the main takeaways of the lesson in a concise yet comprehensive conclusion.\n   - Provide actionable steps or reflective questions for further practice.\n\nYour response should be in proper markdown format, ready to be copied directly into a markdown file and displayed on a website. Follow these guidelines:\n\n1. Use appropriate markdown headers (## for main title, ### for sections, #### for subsections).\n2. Utilize markdown formatting for emphasis (**bold**, *italic*) where appropriate.\n3. Include markdown code blocks (```) for examples, especially for musical notation or scale patterns.\n4. Use markdown list formatting (- or 1., 2., 3.) for bullet points or numbered lists.\n5. For line breaks, use:\n   - A blank line between paragraphs or sections.\n   - Two spaces at the end of a line for a soft line break within a paragraph.\n6. Use </br> for all line breaks instead of \\n.\nEnsure all explanations are accurate and error-free. Write in a friendly teaching tone. Do not excessively use formatting or make the lesson overly complex. Prioritize clarity, depth, and engagement.\n\n**Important Note:** Each section should provide substantial detail to foster a thorough understanding of the topic. Aim for comprehensive content that includes multiple angles, examples, and in-depth explanations.\n\nYour output should be a single, cohesive markdown document that can be directly copied and pasted into a markdown file without any additional formatting needed.\n\n    {{ ctx.output_format }}\n\n\nHere is the chapter you need to create a lesson for:\n  {{ chapter }}: {{ description }}\n  \"#\n}\n\n// Test the function with a sample resume. Open the VSCode playground to run this.\ntest chapter_generation {\n  functions [GenerateChapter]\n  args {\n     chapter #\"\n        Variables and Data Types\n    \"#\n    description #\"\nUnderstanding variables, declaring them using `var`, `let`, and `const`, and working with different data types like numbers, strings, booleans, null, and undefined.\n\n  \"#\n  }\n}\n",
    "chapters.baml": "// Defining a data model.\n\n\nclass ChapterOutline {\n  name string\n  description string\n  slug string\n\n}\n\nclass Chapters {\n  topic string\n  chapters ChapterOutline[]\n}\n\n\n// Create a function to generate rough chapters outline for learning about a topic\nfunction GenerateChapters(topic: string) -> Chapters {\n  // Specify a client as provider/model-name\n  // you can use custom LLM params with a custom client name from clients.baml like \"client CustomHaiku\"\n  client \"google-ai/gemini-1.5-flash-latest\" // Set GOOGLE_API_KEY to use this client.\n  prompt #\"\n    Generate chapter names for learning about {{ topic }} with a brief description.\n    Imagine you want to teach someone about it and you want to recommend what gradual topics should be covered. From the basics to the advanced topics.\n\n    {{ ctx.output_format }}\n  \"#\n}\n\n// Test the function with a sample resume. Open the VSCode playground to run this.\ntest chapters_generation {\n  functions [GenerateChapters]\n  args {\n    topic #\"\n        JavaScript\n    \"#\n  }\n}\n",
    "clients.baml": "// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview\n\nclient<llm> CustomGPT4o {\n  provider openai\n  options {\n    model \"gpt-4o\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomGPT4oMini {\n  provider openai\n  retry_policy Exponential\n  options {\n    model \"gpt-4o-mini\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> CustomSonnet {\n  provider anthropic\n  options {\n    model \"claude-3-5-sonnet-20241022\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\nclient<llm> CustomGemini {\n  provider google-ai\n  options {\n    model \"gemini-1.5-flash-latest\"\n    api_key \"AIzaSyAnxoxYW7QtYT54iCobqtQwVlUR5tUNS-c\"\n  }\n}\n\nclient<llm> CustomHaiku {\n  provider anthropic\n  retry_policy Constant\n  options {\n    model \"claude-3-haiku-20240307\"\n    api_key env.ANTHROPIC_API_KEY\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/round-robin\nclient<llm> CustomFast {\n  provider round-robin\n  options {\n    // This will alternate between the two clients\n    strategy [CustomGPT4oMini, CustomHaiku]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/fallback\nclient<llm> OpenaiFallback {\n  provider fallback\n  options {\n    // This will try the clients in order until one succeeds\n    strategy [CustomGPT4oMini, CustomGPT4oMini]\n  }\n}\n\n// https://docs.boundaryml.com/docs/snippets/clients/retry\nretry_policy Constant {\n  max_retries 3\n  // Strategy is optional\n  strategy {\n    type constant_delay\n    delay_ms 200\n  }\n}\n\nretry_policy Exponential {\n  max_retries 2\n  // Strategy is optional\n  strategy {\n    type exponential_backoff\n    delay_ms 300\n    mutliplier 1.5\n    max_delay_ms 10000\n  }\n}",
    "generators.baml": "// This helps use auto generate libraries you can use in the language of\n// your choice. You can have multiple generators if you use multiple languages.\n// Just ensure that the output_dir is different for each generator.\ngenerator target {\n    // Valid values: \"python/pydantic\", \"typescript\", \"ruby/sorbet\", \"rest/openapi\"\n    output_type \"python/pydantic\"\n\n    // Where the generated code will be saved (relative to baml_src/)\n    output_dir \"../\"\n\n    // The version of the BAML package you have installed (e.g. same version as your baml-py or @boundaryml/baml).\n    // The BAML VSCode extension version should also match this version.\n    version \"0.68.0\"\n\n    // Valid values: \"sync\", \"async\"\n    // This controls what `b.FunctionName()` will be (sync or async).\n    default_client_mode sync\n}\n",
}

def get_baml_files():
    return file_map