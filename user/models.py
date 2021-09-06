from flask import Flask, jsonify, request
from passlib.hash import pbkdf2_sha256
from app import db


class User:

    def signup(self):
        result = request.get_json()
        print(result)

        #Create the user object
        user = {
            "nickname": result["nickname"],
            "email": result["email"],
            "password": result["password"]
        }

        # Encrypt the password
        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        db.users.insert_one(user)

        return jsonify({"result": "okay"}), 200