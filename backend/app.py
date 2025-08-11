import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from gemini_handler import get_gemini_response  # ✅ Removed `backend.`
from data.cspRegions import regions_data        # ✅ Removed `backend.`
from data.regions_data import user_geographic_regions
import uvicorn

from fastapi_app import fastapi_app
app = Flask(__name__)
CORS(app)

if __name__ == "__main__":
    uvicorn.run(fastapi_app, host="0.0.0.0", port=8000)

fastapi_app = FastAPI()  # ✅ Define the FastAPI app

# Allow CORS (frontend-backend communication)
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Correct way to load Gemini Pro
model = genai.GenerativeModel(model_name="gemini-2.5-pro")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")

    if not message:
        return jsonify({"reply": "No input received."}), 400

    try:
        response = model.generate_content(message)
        return jsonify({"reply": response.text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

@fastapi_app.post("/api/recommend")
async def get_recommendation(request: Request):
    data = await request.json()

    csp = data.get("csp")
    region = data.get("region")
    project_type = data.get("projectType")
    user_load = data.get("userLoad")
    budget = data.get("budget")
    description = data.get("description")

    prompt = f"""
You are a cloud architect. Based on the following:
Cloud: {csp}
Region: {region}
Project Type: {project_type}
Expected Load: {user_load}
Monthly Budget: {budget}
Description: {description}

Recommend:
- Optimal services (e.g. EC2, GKE, etc.)
- Estimated monthly cost
- Justification
"""

    response = get_gemini_response(prompt)
    return {"recommendation": response}

# Add endpoint to serve user regions
@fastapi_app.get("/api/user-regions")
def get_user_regions():
    return user_geographic_regions


