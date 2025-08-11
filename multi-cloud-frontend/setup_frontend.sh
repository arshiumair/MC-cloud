#!/bin/bash
# Update system
sudo yum update -y

# Install Node.js and npm (latest available from Amazon Linux Extras)
sudo amazon-linux-extras enable nodejs18
sudo yum install -y nodejs

# Move into frontend folder
cd multi-cloud-frontend

# Install frontend dependencies
npm install

echo "✅ Frontend setup complete"
