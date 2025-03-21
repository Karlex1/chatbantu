import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
# print(os.getenv("GOOGLE_API_KEY"))
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def generate_response(prompt):
    model = genai.GenerativeModel('gemini-2.0-flash')  # Or 'gemini-pro-vision' for multimodal
    response = model.generate_content(prompt)
    return response.text
def chat_with_voice():
    voice_input = get_voice_input()
    if voice_input:
        gemini_response = generate_response(voice_input)
        print(gemini_response)

chat_with_voice()
#Example Usage
user_input = input("Enter Prompt")
gemini_response = generate_response(user_input)
print(gemini_response)