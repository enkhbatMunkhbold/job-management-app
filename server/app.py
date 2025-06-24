from flask import request, session, jsonify
from flask_restful import Resource
from marshmallow.exceptions import ValidationError

from config import app, db, api, ma
from models import User, Client, Job, Order, UserSchema, ClientSchema, JobSchema, OrderSchema


user_schema = UserSchema()
users_schema = UserSchema(many=True)
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)
job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Register(Resource):
    def post(self):
        try: 
            data = request.get_json()
            if not data or not all(k in data for k in ['username', 'email']):
                return jsonify({'error': 'Missing required fields'}), 400
            
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already exists'}), 400

            user = User(username=data['username'], email=data['email'])
            user.password_hash(data['password'])
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return users_schema.dump(user), 201
        except ValidationError as e:
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            return jsonify({'error': 'An error occured during registration'}), 500
        
api.add_resource(Register, '/register')

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data or not all(k in data for k in ['username', 'password']):
                return jsonify({'error': 'Missing required fields'}), 400
            
            user = User.query.filter_by(username=data['username']).first()
            if user and user.authenticate(data['password']):
                session['user_id'] = user.id
                return users_schema.dump(user), 200
            return jsonify({'message': 'Invalid credentials'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500

api.add_resource(Login, '/login')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return users_schema.dump(user), 200
            return jsonify({'error': 'Not authenticated'}), 401
        
class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204
    
api.add_resource(Logout, '/logout')

class Clients(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            if not user_id:
                return {'error': 'Not authenticated'}, 401
            
            user = db.session.get(User, user_id)
            if not user:
                return {'error': 'User not found'}, 404
            
            # Get clients associated with this user through orders
            from sqlalchemy import distinct
            client_ids = db.session.query(distinct(Order.client_id)).filter(Order.user_id == user_id).all()
            client_ids = [client_id[0] for client_id in client_ids]
            
            # Get the actual client objects
            user_clients = Client.query.filter(Client.id.in_(client_ids)).all()
            
            # Debug: print what we're trying to serialize
            print(f"User ID: {user_id}")
            print(f"Client IDs found: {client_ids}")
            print(f"Number of clients: {len(user_clients)}")
            
            result = clients_schema.dump(user_clients)
            print(f"Serialized result: {result}")
            
            return result, 200
        except Exception as e:
            print(f"Error in Clients.get(): {str(e)}")
            return {'error': f'Internal server error: {str(e)}'}, 500
        
api.add_resource(Clients, '/clients')

class Jobs(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')
            if not user_id:
                return {'error': 'Not authenticated'}, 401
            
            user = db.session.get(User, user_id)
            if not user:
                return {'error': 'User not found'}, 404
            
            # Get jobs associated with this user through orders
            from sqlalchemy import distinct
            job_ids = db.session.query(distinct(Order.job_id)).filter(Order.user_id == user_id).all()
            job_ids = [job_id[0] for job_id in job_ids]
            
            # Get the actual job objects
            user_jobs = Job.query.filter(Job.id.in_(job_ids)).all()
            
            # Debug: print what we're trying to serialize
            print(f"User ID: {user_id}")
            print(f"Job IDs found: {job_ids}")
            print(f"Number of jobs: {len(user_jobs)}")
            
            result = jobs_schema.dump(user_jobs)
            print(f"Serialized result: {result}")
            
            return result, 200
        except Exception as e:
            print(f"Error in Jobs.get(): {str(e)}")
            return {'error': f'Internal server error: {str(e)}'}, 500
    
api.add_resource(Jobs, '/jobs')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

