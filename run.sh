#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🇮🇳 Starting JanSeva Agent — Multi-Agent Welfare Orchestrator"
echo "=========================================================="

# Activate virtual environment
if [ -d ".venv" ]; then
    source .venv/bin/activate
else
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
fi

# Build frontend if dist doesn't exist
if [ ! -d "frontend/dist" ]; then
    echo "Building React frontend..."
    cd frontend && npm install && npm run build && cd ..
fi

echo "Launching FastAPI Uvicorn Server at http://127.0.0.1:8000..."
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
