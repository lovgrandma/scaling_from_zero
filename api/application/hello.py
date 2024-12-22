from flask import Flask, request
from flask_cors import CORS
import requests
import json
import sqlite3
import pandas as pd
from multiprocessing.pool import ThreadPool
import os
from dotenv import load_dotenv

load_dotenv()

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

@app.route('/add', methods = ['POST'])
def add():
    data = request.get_json()
    item = requests.get(f"https://pokeapi.co/api/v2/pokemon/{data['item']}")
    response = json.loads(item.text)
    # SQLite Pokemon Table: Name, Abilities -> name, Forms -> name, Game Indices -> name, Moves -> name
    name = response['name']
    abilities = ""
    forms = ""
    game_indices = ""
    moves = ""
    # forms, game_indices, moves
    if response['abilities']:
        abilities = ",".join(map(str, list(map(lambda n: n['ability']['name'], response['abilities']))))
    if response['forms']:
        forms = ",".join(map(str, list(map(lambda n: n['name'], response['forms']))))
    if response['game_indices']:
        game_indices = ",".join(map(str, list(map(lambda n: n['version']['name'], response['game_indices']))))
    if response['moves']:
        moves = ",".join(map(str, list(map(lambda n : n['move']['name'], response['moves']))))
    print(name, abilities, forms, game_indices, moves)
    conn = sqlite3.connect("../../db/tutorial.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE if not exists pokemon(name, abilities, forms, game_incides, moves)")
    cur.execute(f"SELECT * FROM pokemon WHERE NAME = '{name}'")
    results = cur.fetchall()
    print('Cur', cur, conn, "Response", results)
    if len(results) == 0:
        cur.execute(f"INSERT INTO pokemon(name, abilities, forms, game_incides, moves) VALUES ('{name}', '{abilities}', '{forms}', '{game_indices}', '{moves}')")
        conn.commit()
        print("Rows affected", cur.rowcount)
    return data


@app.route('/schedule', methods = ['POST'])
def schedule():
    BATCH_SIZE = int(os.getenv('BATCH_SIZE'))
    # With every request, we need the path where the data was put ahead of time
    data = request.get_json()
    context_path = data['context_path']
    print("Context path", context_path)
    df = pd.read_csv(context_path) # We want to load the data and parse it
    results = [] # Collect results

    pool = ThreadPool(processes=40)
    tasks = []
    if len(df.index) > 0:
        print("Data Frame", df, "Length", len(df.index))
        i = 0
        while i < len(df.index):
            start = i
            end = i + BATCH_SIZE
            i += BATCH_SIZE
            # process_batch(df, start, end, results) # This is the slow way, synchronous
            task = pool.apply_async(
                process_batch,
                args=(df, start, end)
            )
            tasks.append(task)
    pool.close() # Stop accepting new tasks
    pool.join() # Wait for all tasks to complete

    print("Batch job complete")
    for x in tasks:
        task_output = x.get()
        results.append(task_output)
    # Batch the data as its coming in
    # Run each batch and return into an array of results
    print("Results", results)
    return results

# This batch will be x records of total (maybe 10,000)
def process_batch(df, start, end):
    # print("Batch", start, end)
    re = []
    for i in range(start, end):
        r = process_record(df.iloc[i, 1], df.iloc[i, 2]) # Map through each and run process_record
        re.append(r)
    return re

# Function to apply to single record
def process_record(col1, col2):
    # print("process batch", col1, col2)
    # Run sentiment command from library here
    return [ col1, col2 ]