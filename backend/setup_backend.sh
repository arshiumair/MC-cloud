#!/bin/bash
# Update system
sudo yum update -y

# Install Python 3 and pip
sudo yum install -y python3 python3-pip python3-venv

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install backend dependencies
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Backend setup complete"
