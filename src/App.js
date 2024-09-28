import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RecipeExcerpt from './components/RecipeExcerpt';
import NewRecipeForm from './components/NewRecipeForm';
import RecipeFull from './components/RecipeFull';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    servings: 1,
    image_url: ''
  });
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes);
      } else {
        console.error('Failed to fetch recipes');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (response.ok) {
        const addedRecipe = await response.json();
        setRecipes([...recipes, addedRecipe]);
        setShowNewRecipeForm(false);
        setNewRecipe({
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
          servings: 1,
          image_url: ''
        });
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUnselectRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      <Header showRecipeForm={() => setShowNewRecipeForm(true)} />
      {showNewRecipeForm ? (
        <NewRecipeForm
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          onSubmit={handleAddRecipe}
          onCancel={() => setShowNewRecipeForm(false)}
        />
      ) : selectedRecipe ? (
        <RecipeFull 
          selectedRecipe={selectedRecipe} 
          handleUnselectRecipe={handleUnselectRecipe} 
        />
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeExcerpt 
              key={recipe.id} 
              recipe={recipe} 
              handleSelectRecipe={handleSelectRecipe} 
            />
          ))}
          <button onClick={() => setShowNewRecipeForm(true)}>Add New Recipe</button>
        </div>
      )}
    </div>
  );
};

export default App;

