from flask import request, session
from flask_restful import Resource
from marshmallow.exceptions import ValidationError

from config import app, db, api, ma
from models import User, Client, Job, Order

# UserSchema, ClientSchema, JobSchema, OrderSchema


# user_schema = UserSchema()
# users_schema = UserSchema(many=True)
# client_schema = ClientSchema()
# clients_schema = ClientSchema(many=True)
# job_schema = JobSchema()
# jobs_schema = JobSchema(many=True)
# order_schema = OrderSchema()
# orders_schema = OrderSchema(many=True)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

