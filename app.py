from flask import Flask, render_template, url_for
import pymongo

app = Flask(__name__)

#Database
client = pymongo.MongoClient('localhost', 27017)
db = client.memo_app

#Routes
from user import routes

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')