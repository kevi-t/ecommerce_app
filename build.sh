#!/bin/bash

# Exit immediately if any command fails
set -e

echo "Ensuring pip is installed..."
python3.9 -m ensurepip --default-pip
python3.9 -m pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
python3.9 -m pip install -r requirements.txt

# Run migrations
echo "Applying database migrations..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python3.9 manage.py collectstatic --noinput --clear

echo "Build process completed successfully!"