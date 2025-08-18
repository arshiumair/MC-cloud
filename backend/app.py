
import uvicorn
from fastapi_app import fastapi_app

if __name__ == "__main__":
    uvicorn.run(fastapi_app, host="0.0.0.0", port=8001)

    # ...existing code...


