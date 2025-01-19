# Go to path
cd api

# Create virtual environment
python -m venv scaling-api

# Activate environment
source scaling-api/Scripts/activate

# Run application in api/application
cd application
flask run

# Save your updates separately
git checkout -b my_updates
git add .
git commit -a
press a
Type what you want to put
:wq!
git push

# Checkout master again
git checkout master