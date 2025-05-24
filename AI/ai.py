'''
To start, paste the following pip functions into the terminal:
  pip install openai
  pip install google-genai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os
from openai import OpenAI
from google import genai
from apikeys import openaikey, geminikey

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey)
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY', geminikey)

gpt = OpenAI()
gemini = genai.Client(api_key = os.environ['GOOGLE_API_KEY'])

system_message = "You are part of an app that helps inform people of natural disasters"
user_prompt = "Put together a list of supplies for a natural disaster emergency kit. Respond as json with item name, description, quantity, and expiration. For expiration, responses should be as quantitative as possible: a specific amount of time, not range (if applicable) is ideal. If an entry consists of multiple items with differnt expiration dates, state the most recent one. Also, if applicable, provide amazon search links where each item can be obtained."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temperature = 0.3

#I generally prefer GPT's responses to Gemini's, since they're more consise, but I wrote in the code for both (if you wanted options)
completion = gpt.chat.completions.create(
    model="gpt-4o",
    messages=prompts,
    temperature=temperature
)
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