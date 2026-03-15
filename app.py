import os
import random
import json
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Load puzzles from a JSON file
with open('puzzles.json', 'r') as f:
    puzzles_db = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_puzzle')
def get_puzzle():
    # Filter or just pick random puzzle
    puzzle = random.choice(puzzles_db)
    return jsonify(puzzle)

if __name__ == '__main__':
    app.run(debug=True)
