from flask import request, session, jsonify
from flask_restful import Resource
from marshmallow.exceptions import ValidationError

from config import app, db, api, ma
from models import User, Client, Job, Order, UserSchema, ClientSchema, JobSchema, JobPublicSchema, OrderSchema


user_schema = UserSchema()
users_schema = UserSchema(many=True)
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)
job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
job_public_schema = JobPublicSchema()
jobs_public_schema = JobPublicSchema(many=True)
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

            new_user = user_schema.load(data)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            return users_schema.dump(new_user), 201
        
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
            
            result = clients_schema.dump(user.clients)            
            return result, 200
        
        except Exception as e:
            print(f"Error in Clients.get(): {str(e)}")
            return {'error': f'Internal server error: {str(e)}'}, 500
        
api.add_resource(Clients, '/clients')

class Jobs(Resource):
    def get(self):
        jobs = Job.query.all()
        result = jobs_public_schema.dump(jobs)
        return result, 200
    #     try:
    #         user_id = session.get('user_id')
    #         if not user_id:
    #             return {'error': 'Not authenticated'}, 401
            
    #         user = db.session.get(User, user_id)
    #         if not user:
    #             return {'error': 'User not found'}, 404        

    #         result = jobs_schema.dump(user.jobs)            
    #         return result, 200
        
    #     except Exception as e:
    #         print(f"Error in Jobs.get(): {str(e)}")
    #         return {'error': f'Internal server error: {str(e)}'}, 500
        
    def post(self):
        try:
            # user_id = session.get('user_id')
            # if not user_id:
            #     return {'error': 'Not authenticated'}, 401
            
            # user = db.session.get(User, user_id)
            # if not user:
            #     return {'error': 'User not found'}, 404
            
            data = request.get_json()
            new_job = job_schema.load(data)

            db.session.add(new_job)
            db.session.commit()
            return job_public_schema.dump(new_job), 201
        
        except ValidationError as ve:
            return {'error': ve.messages}, 400
        
        except Exception as e:
            db.session.rollback()
            return {'error': f'Internal server error {str(e)}'}, 400
    
api.add_resource(Jobs, '/jobs')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

