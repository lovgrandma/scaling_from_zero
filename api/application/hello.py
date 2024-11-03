from flask import Flask, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__) # Creating a flask instance and putting it into app
CORS(app)

@app.route('/')
def hello():
    return 'Hello World'

@app.route('/job')
def job():
    data = []
    jobs = request.args.get('jobs').split(',')
    for x in jobs:
        res = requests.get(f"https://pokeapi.co/api/v2/pokemon/{x}")
        response = json.loads(res.text)
        data.append(response)
    print(jobs)
    return data

