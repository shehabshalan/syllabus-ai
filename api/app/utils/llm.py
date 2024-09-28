import json

from openai import OpenAI

from app.utils.settings import ResponseFormat, Settings


class LLM:
    def __init__(self, settings: Settings):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.MODEL

    def query(
        self,
        user_input: str,
        system_prompt="",
        model: str = None,
        format: ResponseFormat = ResponseFormat.TEXT,
    ):
        model = model or self.model
        try:
            response = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": user_input,
                    },
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                ],
                model=model,
                response_format={"type": format},
            )

            response = response.choices[0].message.content

            if format == ResponseFormat.JSON_OBJECT:
                if not self.validate_json(response):
                    raise {"error": "Invalid JSON response"}
                return json.loads(response)

            return response

        except Exception as e:
            raise {"error": str(e)}

    def validate_json(self, response: str):
        try:
            json.loads(response)
            return True
        except json.JSONDecodeError:
            return False
