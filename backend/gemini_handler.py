import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-pro")

def get_gemini_response(prompt_text):
    try:
        response = model.generate_content(prompt_text)
        # Try .text first
        if hasattr(response, "text") and response.text:
            return response.text
        # Try extracting from candidates/parts
        if hasattr(response, "candidates") and response.candidates:
            for candidate in response.candidates:
                if hasattr(candidate, "content") and candidate.content:
                    # If candidate.content.parts exists, join all as string
                    if hasattr(candidate.content, "parts") and candidate.content.parts:
                        # Each part may be a dict or string; join all as markdown
                        return "\n".join(str(part) for part in candidate.content.parts)
                    # Fallback: try str(candidate.content)
                    return str(candidate.content)
        # Fallback: try str(response)
        return str(response) if response else "Sorry, no response was generated. Please try again or rephrase your question."
    except Exception as e:
        return f"Error: {e}"
