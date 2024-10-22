# server.py
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to your MongoDB database
client = MongoClient("mongodb+srv://cervantesesau:j8dHqklg2tz0pAd5@cluster0.uzubp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['click_counter_db']
counters_collection = db['counters']

# Initialize counters in the database if they don't exist
if counters_collection.count_documents({}) == 0:
    counters_collection.insert_one({'name': 'A', 'count': 0})
    counters_collection.insert_one({'name': 'O', 'count': 0})

@app.route('/get_counts', methods=['GET'])
def get_counts():
    # Get counts from MongoDB
    counts = {doc['name']: doc['count'] for doc in counters_collection.find()}
    return jsonify(counts)

@app.route('/increment/<counter>', methods=['POST'])
def increment_counter(counter):
    # Increment the specified counter
    counters_collection.update_one({'name': counter}, {'$inc': {'count': 1}})
    # Get the updated count
    updated_count = counters_collection.find_one({'name': counter})['count']
    return jsonify({counter: updated_count})

if __name__ == '__main__':
    app.run(debug=True)
