from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Configure database connection (Replace with your actual database URI)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # You can replace sqlite with other DBs if needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Create a simple model (example)
class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)

# Create database tables
with app.app_context():
    db.create_all()

# Define a basic route
@app.route('/')
def home():
    return jsonify(message="Welcome to the Recipe API!")

# Define a route to get all recipes
@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    output = []
    for recipe in recipes:
        recipe_data = {'id': recipe.id, 'name': recipe.name, 'description': recipe.description}
        output.append(recipe_data)
    return jsonify(recipes=output)

# Define a route to add a recipe
@app.route('/recipe', methods=['POST'])
def add_recipe():
    data = request.get_json()  # Get the JSON data from the request
    new_recipe = Recipe(name=data['name'], description=data.get('description'))  # Create a new recipe instance
    db.session.add(new_recipe)  # Add to the database session
    db.session.commit()  # Commit the changes to the database
    return jsonify(message="Recipe added successfully!", recipe_id=new_recipe.id)  # Return a success message with recipe ID

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
