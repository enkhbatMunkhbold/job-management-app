from marshmallow import validates, ValidationError, post_load, fields
from marshmallow_sqlalchemy import auto_field
from datetime import date, datetime
from config import db, bcrypt, ma

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(30), nullable=False)
  email = db.Column(db.String(60), unique=True, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  jobs = db.relationship('Job', backref='user', lazy=True)
  clients = db.relationship('Client', backref='user', lazy=True)

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
  email = db.Column(db.String(60), unique=True, nullable=False)
  phone = db.Column(db.String, nullable=False)
  notes = db.Column(db.Text, nullable=False)

  orders = db.relationship('Order', backref='client', cascade='all, delete-orphan', lazy=True)
    
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

  orders = db.relationship('Order', backref='job', cascade='all, delete-orphan', lazy=True)
    
  def __repr__(self):
    return f'<Style {self.title}>' 

class Order(db.Model):
   __tablename__ = 'orders'

   id = db.Column(db.Integer, primary_key=True)
   description = db.Column(db.Text, nullable=False)
   location = db.Column(db.Text, nullable=False)
   start_date = db.Column(db.Date, nullable=False)
   status = db.Column(db.String(20), nullable=False, default='pending')

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

  username = auto_field(required=True)
  email = auto_field(required=True)
  password = fields.String(load_only=True, required=True)

  @validates('email')
  def validate_email(self, value):
    if '@' not in value or '.' not in value:
      raise ValidationError('Invalid email format')
    if len(value) < 5:
      raise ValidationError('Email must be at least 5 characters long')

  @validates('username')
  def validate_fname(self, value):
    if len(value) < 2:
      raise ValidationError('Username must be at least 2 characters long')
    if not value.isalnum():
      raise ValidationError('Username must contain only letters and spaces')

  @post_load
  def make_user(self, data, **kwargs):
    password = data.pop('password', None)
    user = User(**data)
    if password:
      user.set_password(password)
    return user
  
class JobSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Job
    load_instance = True
    exclude = ('users',)

  title = auto_field(required=True)
  description = auto_field(required=True)
  duration = auto_field(required=True)
  price = auto_field(required=True)
  rate = auto_field(required=True)

  @validates('title')
  def validate_title(self, value):
    if len(value) < 5:
      raise ValidationError('Job title must be at least 5 characters long')

  @validates('description')
  def validate_description(self, value):
    if len(value) < 10:
      raise ValidationError('Job description must be at least 10 characters long')
    
  @validates('duration')
  def validate_duration(self, value):
    if value <= 0:
      raise ValidationError('Job duration time must be greater than 0')

  @validates('price')
  def validate_price(self, value):
    if value <= 0:
      raise ValidationError('Job price must be greater than 0')

  @validates('rate')
  def validate_rate(self, value):
    if len(value) < 10:
      raise ValidationError('Job rate must be at least 10 characters long')

class ClientSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Client
    load_instance = True
    exclude = ('users')

  name = auto_field(required=True)
  email = auto_field(required=True)
  notes = auto_field(required=True)

  @validates('name')
  def validate_name(self, value):
    if len(value) < 2:
      raise ValidationError('Client name must be at least 2 characters long')
    
  @validates('email')
  def validate_email(self, value):
    if '@' not in value or '.' not in value:
      raise ValidationError('Invalid email format')
    if len(value) < 5:
      raise ValidationError('Email must be at least 5 characters long')
    
  @validates('notes')
  def validate_notes(self, value):
    if len(value) < 20:
      raise ValidationError('Client notes must be at least 20 characters long')

class OrderSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Order
    load_instance = True
    include_fk = True

  id = auto_field(dump_only=True)
  description = auto_field(required=True)
  location = auto_field(required=True)
  start_date = auto_field(required=True)
  status = auto_field(required=True)

  user_id = auto_field(required=True)
  client_id = auto_field(required=True)
  job_id = auto_field(required=True)

  user = fields.Nested('UserSchema', dump_only=True)
  client = fields.Nested('ClientSchema', dump_only=True)
  job = fields.Nested('JobSchema', dump_only=True)

  @validates('description')
  def validate_description(self, value):
    if len(value.strip()) < 5:
      raise ValidationError('Order description must be at least 5 characters long')
    
  @validates('location')
  def validate_location(self, value):
    if len(value.strip()) < 10:
      raise ValidationError('Order location must be at least 10 characters long')
    
  @validates('status')
  def validate_status(self, value):
    allowed_statuses = ['pending', 'in progress', 'completed', 'canceled']
    if value.lower() not in allowed_statuses:
      raise ValidationError(f"Status must be one of: {', '.join(allowed_statuses)}")
