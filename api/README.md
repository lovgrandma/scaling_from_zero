# Create virtual environment
python -m venv scaling-api

# Go to path
cd api

# Activate environment
source scaling-api/Scripts/activate

# Run application in api/application
cd application
flask run