from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from data.cspRegions import regions_data
from data.regions_data import user_geographic_regions
from data.project_types import project_types
from data.workload_types import workload_types
from gemini_handler import get_gemini_response
from pydantic import BaseModel

fastapi_app = FastAPI()

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@fastapi_app.get("/api/regions")
def get_regions():
    return regions_data

@fastapi_app.get("/api/user-regions")
def get_user_regions():
    return user_geographic_regions

@fastapi_app.get("/api/project-types")
def get_project_types():
    return project_types

@fastapi_app.get("/api/workload-types")
def get_workload_types():
    return workload_types

class EstimateRequest(BaseModel):
    csp: str
    region: str
    budget: str
    projectType: str
    users: str
    description: str = ""

@fastapi_app.post("/api/recommend")
async def get_estimate(request: Request):
    data = await request.json()
    prompt = f"""
    Your are an expert cloud architect. Give me a cloud deployment recommendation based on the following:

    Cloud Provider: {data.get('csp')}
    Region: {data.get('region')}
    User Base Region: {data.get('userBaseRegion')}
    Budget: {data.get('budget')}
    Project Type: {data.get('projectType')}
    User Load: {data.get('users')}
    Additional Info: {data.get('description')}

    Respond in simple language with: 
    - recommended services 
    - expected monthly cost 
    - performance overview 
    - other tips.
    """
    gemini_response = get_gemini_response(prompt)
    return {"response": gemini_response}

@fastapi_app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "")
    if not message:
        return {"reply": "No input received."}
    response = get_gemini_response(message)
    return {"reply": response}