from flask import Flask, request
from flask_cors import CORS
import requests
import json
import sqlite3

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

