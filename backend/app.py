from flask import Flask
from flask_cors import CORS
from config import FLASK_ENV, FLASK_DEBUG
from routes.user_routes import user_routes
from routes.donor_routes import donor_routes
from routes.request_routes import request_routes

app = Flask(__name__)
CORS(app) 

app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(donor_routes, url_prefix="/api/donors")
app.register_blueprint(request_routes, url_prefix="/api/requests")

if __name__ == "__main__":
    app.run(debug=FLASK_DEBUG)
