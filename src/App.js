import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RecipeExcerpt from "./components/RecipeExcerpt";
import NewRecipeForm from "./components/NewRecipeForm";
import RecipeFull from "./components/RecipeFull";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    servings: 1,
    description: "",
    image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  });
  const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    };

    fetchRecipes();
  }, []);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleUnselectRecipe = () => {
    setSelectedRecipe(null);
  };

  const showRecipeForm = () => {
    setShowNewRecipeForm(true);
    setSelectedRecipe(null);
  };

  const hideRecipeForm = () => {
    setShowNewRecipeForm(false);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
        setSelectedRecipe(null);
        console.log("Recipe deleted successfully");
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (e) {
      console.error("Something went wrong during the request:", e);
    }
  };

  const handleNewRecipe = async (e, newRecipe) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecipe)
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes([...recipes, data.recipe]);
        setShowNewRecipeForm(false);
        setNewRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          servings: 1,
          description: "",
          image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        });
      } else {
        console.error("Failed to create recipe:", response.status);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const updateSearchTerm = (text) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    const searchResults = recipes.filter((recipe) => {
      const valuesToSearch = [recipe.title, recipe.ingredients, recipe.description];
      return valuesToSearch.some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    return searchResults;
  };

  const displayedRecipes = searchTerm ? handleSearch() : recipes;

  return (
    <div className="app">
      <Header showRecipeForm={showRecipeForm} searchTerm={searchTerm} updateSearchTerm={updateSearchTerm} />
      {showNewRecipeForm ? (
        <NewRecipeForm 
          newRecipe={newRecipe} 
          onUpdateForm={onUpdateForm} 
          handleNewRecipe={handleNewRecipe}
          hideRecipeForm={hideRecipeForm}
        />
      ) : (
        <div className="recipe-list">
          {displayedRecipes.map(recipe => (
            <RecipeExcerpt 
              key={recipe.id} 
              recipe={recipe} 
              handleSelectRecipe={handleSelectRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          ))}
        </div>
      )}
      {selectedRecipe && (
        <RecipeFull 
          selectedRecipe={selectedRecipe} 
          handleUnselectRecipe={handleUnselectRecipe} 
          handleDeleteRecipe={handleDeleteRecipe}
        />
      )}
    </div>
  );
};

export default App;
