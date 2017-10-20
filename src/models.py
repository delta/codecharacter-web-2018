from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    activated = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, name, email, password, activated):
        self.name = name
        self.email = email
        self.password = password
        self.activated = activated

    def __repr__(self):
        return '<User id {}>'.format(self.id)

class Constant(db.Model):
    __tablename__ = 'constants'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    key = db.Column(db.String(255), nullable=False)
    value = db.Column(db.String(255), nullable=False)

    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __repr__(self):
        return '<Constant {}>'.format(self.key)

class Code(db.Model):
    __tablename__ = 'codes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    source = db.Column(db.String(255), nullable=False)
    dll1 = db.Column(db.String(255), nullable=False)
    dll2 = db.Column(db.String(255), nullable=False)

    def __init__(self, user_id, source, dll1, dll2):
        self.user_id = user_id
        self.source = source
        self.dll1 = dll1
        self.dll2 = dll2

    def __repr__(self):
        return '<Code id {}>'.format(self.id)

class Ai(db.Model):
    __tablename__ = 'ais'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    dll1 = db.Column(db.String(255), nullable=False)
    dll2 = db.Column(db.String(255), nullable=False)

    def __init__(self, dll1, dll2):
        self.dll1 = dll1
        self.dll2 = dll2

    def __repr__(self):
        return '<Ai {}>'.format(self.id)

class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    player1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    player2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    ai_id = db.Column(db.Integer, db.ForeignKey('ais.id'), nullable=True)
    status = db.Column(db.String(255), nullable=False)

    def __init__(self, player1, player2, ai_id, status):
        self.player1 = player1
        self.player2 = player2
        self.ai_id = ai_id
        self.status = status

    def __repr__(self):
        return '<Match id {}>'.format(self.id)

class Queue(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey('matches.id'), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)
    priority = db.Column(db.Integer, nullable=False)

    def __init__(self, match_id, timestamp, priority):
        self.match_id = match_id
        self.timestamp = timestamp
        self.priority = priority

    def __repr__(self):
        return '<Job match-id {}>'.format(self.match_id)
