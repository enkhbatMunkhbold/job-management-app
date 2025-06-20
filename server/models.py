from config import db, bcrypt, ma
from marshmallow import post_load, validates, ValidationError

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(30), nullable=False)
  email = db.Column(db.String(60), unique=True, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  orders = db.relationship('Order', backref='user', lazy=True)

  def set_password(self, password):
      if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
      password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
      self._password_hash = password_hash.decode('utf-8')

  def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))  
  
  def __repr__(self):
      return f"<User {self.username}>" 

class Client(db.Model):
  __tablename__ = 'clients'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(30), nullable=False)
  emial = db.Column(db.String(60), nullable=False)
  phone = db.Column(db.String, nullable=False)
  notes = db.Column(db.Text, nullable=False)

  orders = db.relationship('Order', backref='client', lazy=True)
    
  def __repr__(self):
    return f'<Client {self.name}>'
  
class Job(db.Model):
  __tablename__ = 'jobs'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(30), nullable=False)
  description = db.Column(db.Text, nullable=False)
  rate = db.Column(db.String, nullable=False)
  duration = db.Column(db.String, nullable=False)
  price = db.Column(db.Float, nullable=False)

  orders = db.relationship('Order', backref='job', lazy=True)
    
  def __repr__(self):
    return f'<Style {self.title}>' 
