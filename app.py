from flask import Flask, render_template, url_for, session, redirect, flash, request
from functools import wraps
import pymongo

app = Flask(__name__)
app.secret_key = b'\xebz\xf5\x92\x16\xf4\xe8(\x95\xad\x92\xb4\xfdU\x90\xe6'

#Database
client = pymongo.MongoClient('localhost', 27017)
db = client.memo_app

#Decorators(인증 확인)
def login_required(func):
    @wraps(func)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return func(*args, **kwargs)
        else:
            return redirect('/')
    return wrap

#Routes
from user import routes

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/dashboard/', methods=['GET'])
@login_required
def dashboard():
    return render_template('dashboard.html')