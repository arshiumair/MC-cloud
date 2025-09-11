# Multi-Cloud Recommendation Platform

## Purpose

This project is a full-stack web application that helps users select optimal cloud providers, regions, and architectures for their workloads. It leverages AI (Google Gemini) to provide recommendations, cost estimates, and interactive chat support for cloud deployment decisions. The platform supports AWS, Azure, and GCP, and is designed for developers, architects, and businesses seeking data-driven multi-cloud strategies.

## Features

- **AI-powered cloud recommendations** (via Gemini)
- **Cost estimation** for various cloud providers and regions
- **Interactive Copilot chat** for cloud Q&A
- **Visualization** of recommended architectures
- **Modern React frontend** and **FastAPI/Flask backend**

---

## Folder Structure

```
MC-cloud/
│
├── backend/                  # Python backend (FastAPI, Flask, Gemini integration)
│   ├── app.py                # Main backend entry point
│   ├── fastapi_app.py        # FastAPI app and API endpoints
│   ├── gemini_handler.py     # Gemini AI integration logic
│   ├── recommender.py        # Cloud recommendation logic
│   ├── requirements.txt      # Python dependencies
│   ├── setup_backend.sh      # Linux backend setup script
│   └── data/                 # Data for regions, project types, etc.
│       ├── cspRegions.py
│       ├── project_types.py
│       ├── regions_data.py
│       └── workload_types.py
│
├── multi-cloud-frontend/     # React frontend
│   ├── package.json          # Frontend dependencies
│   ├── setup_frontend.sh     # Linux frontend setup script
│   ├── public/               # Static assets
│   └── src/                  # React source code
│       ├── App.js, App.css   # Main app files
│       ├── config/           # Centralized configuration (e.g., apiConfig.js)
│       ├── components/       # Reusable React components
│       └── pages/            # Main app pages (CopilotChat, Estimate, etc.)
│
├── package.json              # Root-level dev dependencies (e.g., Tailwind)
└── README.md                 # Project documentation
```
---

## Centralized API Configuration

All frontend API endpoints are managed in a single file: `src/config/apiConfig.js`.

**Example usage:**

```js
import apiConfig from "../config/apiConfig";

fetch(apiConfig.CHAT, { /* ... */ });
```

This makes it easy to update API URLs and manage environments (e.g., using environment variables like `REACT_APP_API_BASE_URL`).


---

## Environment Setup

### Backend (Python, FastAPI/Flask)

#### Linux

```bash
# Update system
sudo yum update -y

# Install Python 3 and pip
sudo yum install -y python3 python3-pip python3-venv

# Navigate to backend directory
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

#### Windows (PowerShell)

```powershell
# Open PowerShell as Administrator

# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

---

### Frontend (React)

#### Linux

```bash
# Update system
sudo yum update -y

# Install Node.js and npm
sudo amazon-linux-extras enable nodejs18
sudo yum install -y nodejs

# Navigate to frontend directory
cd multi-cloud-frontend

# Install dependencies
npm install
```

#### Windows (PowerShell)

```powershell
# Open PowerShell

# Navigate to frontend directory
cd multi-cloud-frontend

# Install dependencies
npm install
```

---

## Running the Application

1. **Start the backend:**
   - Linux: `cd backend && source venv/bin/activate && python app.py`
   - Windows: `cd backend; .\venv\Scripts\Activate; python app.py`

2. **Start the frontend:**
   - `cd multi-cloud-frontend && npm start`

---

## Configuration

- **API Keys:** Set your `GEMINI_API_KEY` in a `.env` file in the backend directory.
- **Endpoints:** The backend runs on port 8000 by default.

---


---

## Contribution Guidelines

- Please open issues or pull requests for suggestions, bug reports, or improvements.
- Follow best practices for Python and React code style.
- Keep sensitive keys and credentials out of version control.

---

