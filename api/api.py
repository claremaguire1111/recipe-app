from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

<<<<<<< HEAD
# Initialize the Flask app
app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
db = SQLAlchemy(app)

# Define the Recipe model
class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True, default='Delicious. You need to try it!')
    image_url = db.Column(db.String(500), nullable=True, default="https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    servings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title}>"

# Create the database and tables
with app.app_context():
    db.create_all()

# Route to get all recipes
@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipe_list = []
    for recipe in recipes:
        recipe_list.append({
            'id': recipe.id,
            'title': recipe.title,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'description': recipe.description,
            'image_url': recipe.image_url,
            'servings': recipe.servings
        })
    return jsonify(recipe_list)

# Route to add a new recipe
@app.route('/api/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    
    # Check for required fields
    required_fields = ['title', 'ingredients', 'instructions', 'servings']
    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({'error': f"Missing required field: '{field}'"}), 400
    
    # Create a new recipe
    new_recipe = Recipe(
        title=data['title'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        servings=data['servings'],
        description=data.get('description', 'Delicious. You need to try it!'),
        image_url=data.get('image_url', "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    )
    
    # Add and commit the new recipe to the database
    db.session.add(new_recipe)
    db.session.commit()

    # Return the new recipe data
    new_recipe_data = {
        'id': new_recipe.id,
        'title': new_recipe.title,
        'ingredients': new_recipe.ingredients,
        'instructions': new_recipe.instructions,
        'description': new_recipe.description,
        'image_url': new_recipe.image_url,
        'servings': new_recipe.servings
    }

    return jsonify({'message': 'Recipe added successfully', 'recipe': new_recipe_data})
=======
# Initialize Flask app
app = Flask(__name__)

# Configure database connection (Replace with your actual database URI)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # You can replace sqlite with other DBs if needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
>>>>>>> 2b503a69f9b2e24f9cd64a3d1c725836dbba5a5a

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
