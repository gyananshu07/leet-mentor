from config.secrets import settings
from openai import OpenAI

# Initialize the reusable OpenAI client using the API key from settings
client = OpenAI(api_key=settings.OPENAI_API_KEY)
