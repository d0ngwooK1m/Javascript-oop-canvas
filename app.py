from flask import Flask, render_template, url_for, session, redirect, flash, request, jsonify
from passlib.hash import pbkdf2_sha256
from functools import wraps
import uuid
import pymongo

app = Flask(__name__)
app.secret_key = b'\xebz\xf5\x92\x16\xf4\xe8(\x95\xad\x92\xb4\xfdU\x90\xe6'

#Database
client = pymongo.MongoClient('mongodb://test:test@localhost', 27017)
# client = pymongo.MongoClient('localhost', 27017)
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
# from user import routes
class User:
    def start_session(self, user):
        session["logged_in"] = True
        session["user"] = user
        return jsonify(user), 200

    def signup(self):
        result = request.get_json()
        # print(result)

        #Create the user object
        user = {
            "_id": uuid.uuid4().hex,
            "nickname": result["nickname"],
            "email": result["email"],
            "password": result["password"]
        }

        # Encrypt the password
        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        #Check if user email already registered
        if db.users.find_one({"email": user["email"]}) is not None:
            return jsonify({"result": "이메일이 이미 존재합니다!"}), 400

        db.users.insert_one(user)


        return jsonify({"result": "회원가입 실패"}), 400

    def login(self):
        result = request.get_json()
        # print(result)

        match_info = db.users.find_one({"email": result["email"]})
        registered_password = match_info["password"]

        password_check = pbkdf2_sha256.verify(result["password"], registered_password)
        if match_info is not None and password_check is True:
            user = {
                "nickname": match_info["nickname"],
                "email": match_info["email"],
            }
            return self.start_session(user)

        return jsonify({"result": "failed"}), 401

    def logout(self):
        session.clear()
        return redirect('/')

@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/login', methods=['POST'])
def login():
    return User().login()

@app.route('/user/logout', methods=['GET'])
def logout():
    return User().logout()

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/dashboard/', methods=['GET'])
@login_required
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)