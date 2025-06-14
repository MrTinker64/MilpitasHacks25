'''
To start, paste the following pip functions into the terminal:
  pip install google-genai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os
from google import genai
from AI.apikeys import geminikey

import json

os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY', geminikey)
gemini = genai.Client(api_key = os.environ['GOOGLE_API_KEY'])

long = "37.4323° N"
lat = "121.8996° W"

system_message = "You are part of an app that helps inform people of natural disasters"
user_prompt = "Put together a list of supplies for an emergency kit, in preparation for a local natural disaster (based on the user's location of", long, lat + "). Respond as json with item name, description, quantity, and expiration. For expiration, responses should be as quantitative as possible: a specific amount of time, not range (if applicable) is ideal. If an entry consists of multiple items with differnt expiration dates, state the most recent one. Also, if applicable, provide amazon search links where each item can be obtained."

def call_gemini(user_prompttt):
   response = gemini.models.generate_content(
      model="gemini-2.0-flash",
      contents=[f"{user_prompttt}"]
   )
   print("gemini_called")
   noTildes = response.text.replace("```", "")
   noJson = noTildes.replace("json", "")
   return json.loads(noJson)

if __name__ == "__main__":
    print(call_gemini(user_prompt))