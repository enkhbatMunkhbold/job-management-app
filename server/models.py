from config import db, bcrypt, ma
from marshmallow import post_load, validate, ValidationError
from datetime import date, datetime

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

class Order(db.Model):
   __tablename__ = 'orders'

   id = db.Column(db.Integer, primary_key=True)
   description = db.Column(db.Text, nullable=False)
   location = db.Column(db.Text, nullable=False)
   start_date = db.Column(db.Date, nullable=False)
   status = db.Column(db.String, nullable=False)

   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
   job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)

   def __repr__(self):
      return f'<Order {self.status}>'
   
class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = User
    load_instance = True
    exclude = ('_password_hash', 'orders')
  password = ma.String(load_only=True)

  @validates('email')
  def validate_email(self, value):
    if '@' not in value or '.' not in value:
      raise ValidationError('Invalid email format')
    if len(value) < 5:
      raise ValidationError('Email must be at least 5 characters long')

  @validates('username')
  def validate_fname(self, username):
    if len(username) < 2:
      raise ValidationError('Username must be at least 2 characters long')
    if not username.replace(' ', '').isalpha():
      raise ValidationError('Username must contain only letters and spaces')

  @post_load
  def make_traveler(self, data, **kwargs):
    if 'password' in data:
      user = User(
        username=data['username'],
        email=data['email']
      )
      user.set_password(data['password'])
      return user
    return user(**data)
  
class JobSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Job
    load_instance = True
    exclude = ('jobs',)

  @validates('title')
  def validate_title(self, title):
    if len(title) < 5:
      raise ValidationError('Job title must be at least 5 characters long')

  @validates('description')
  def validate_description(self, description):
    if len(description) < 20:
      raise ValidationError('Job description must be at least 20 characters long')
    
  @validates('duration')
  def validate_duration(self, duration):
    if duration <= 0:
      raise ValidationError('Job duration time must be greater than 0')

  @validates('price')
  def validate_price(self, price):
    if price <= 0:
      raise ValidationError('Job price must be greater than 0')

  @validates('rate')
  def validate_rate(self, rate):
    if len(rate) < 10:
      raise ValidationError('Job rate must be at least 10 characters long')

class ClientSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Client
    load_instance = True
    exclude = ('clients',)

  @validates('name')
  def validate_name(self, name):
    if len(name) < 2:
      raise ValidationError('Client name must be at least 2 characters long')
    
  @validates('email')
  def validate_email(self, value):
    if '@' not in value or '.' not in value:
      raise ValidationError('Invalid email format')
    if len(value) < 5:
      raise ValidationError('Email must be at least 5 characters long')
    
  @validates('notes')
  def validate_notes(self, notes):
    if len(notes) < 20:
      raise ValidationError('Client notes must be at least 20 characters long')

  
