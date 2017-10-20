from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from config import DB_URI

import os
import sys

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
db.init_app(app)

# Main View routes
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
