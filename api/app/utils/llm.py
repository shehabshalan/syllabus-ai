import json

import diskcache
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
        cached_response = self.get_cached_response(user_input, format)
        if cached_response:
            return cached_response

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
            self.cache_response(user_input, response)
            if format == ResponseFormat.JSON_OBJECT:
                return self.validate_json(response)
            return response

        except Exception as e:
            raise Exception("An error occurred while processing the request") from e

    def validate_json(self, response: str):
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            raise ValueError("Invalid JSON response")

    def get_cache(self):
        return diskcache.Cache("cache")

    def cache_response(self, key, response):
        cache = self.get_cache()
        cache.set(key, response)
        cache.close()

    def get_cached_response(self, key, format):
        cache = self.get_cache()
        response = cache.get(key)
        cache.close()
        if response:
            if format == ResponseFormat.JSON_OBJECT:
                return self.validate_json(response)

            return response
