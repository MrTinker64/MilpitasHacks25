#pip install google-genai, pip install openai

import os
from openai import OpenAI
from google import genai
from apikeys import openaikey, geminikey

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey)
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY', geminikey)

gpt = OpenAI()
gemini = genai.Client(api_key = os.environ['GOOGLE_API_KEY'])

system_message = "You are part of an app that helps inform people of natural disasters"
user_prompt = "Put together a list of supplies for a natural disaster emergency kit. Respond as json."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temperature = 0.7

completion = gpt.chat.completions.create(
    model="gpt-4o",
    messages=prompts,
    temperature=temperature)
response = completion.choices[0].message.content
delim = '+++++++++++++++++++'
print(delim, "GPT", delim)
print(response)

response = gemini.models.generate_content(
    model="gemini-2.0-flash",
    contents=user_prompt,
    #temperature=temperature
)
print(delim, "Gemini", delim)
print(response.text)