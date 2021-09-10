from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid


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