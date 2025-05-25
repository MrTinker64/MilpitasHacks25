'''
To start, paste the following pip functions into the terminal:
  pip install openai
  pip install google-genai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os
from openai import OpenAI
from google import genai
from AI.apikeys import openaikey, geminikey

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey)
os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY', geminikey)

gpt = OpenAI()
gemini = genai.Client(api_key = os.environ['GOOGLE_API_KEY'])

long = "37.4323° N"
lat = "121.8996° W"

system_message = "You are part of an app that helps inform people of natural disasters"
user_prompt = "Put together a list of supplies for an emergency kit, in preparation for a local natural disaster (based on the user's location of", long, lat + "). Respond as json with item name, description, quantity, and expiration. For expiration, responses should be as quantitative as possible: a specific amount of time, not range (if applicable) is ideal. If an entry consists of multiple items with differnt expiration dates, state the most recent one. Also, if applicable, provide amazon search links where each item can be obtained."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temp = 0.3

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss
        # temperature=temp
    )
    response = completion.choices[0].message.content
    return "GPT:", response

def call_gemini(user_prompttt):
   response = gemini.models.generate_content(
      model="gemini-2.0-flash",
      contents=[f"{user_prompttt}"]
      #temperature=temp
   )
   print(response)
   return response

#print(call_gpt(prompts))
# print(call_gemini(user_prompt))