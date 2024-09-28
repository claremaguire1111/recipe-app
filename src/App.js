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

  // Fetch recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data.recipes);
        } else {
          console.error("Failed to fetch recipes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
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
    setSelectedRecipe(null); // Hide selected recipe
  };

  const hideRecipeForm = () => {
    setShowNewRecipeForm(false);
  };

  // Handle new recipe submission
  const handleNewRecipe = async (e, newRecipe) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecipe) // Send new recipe data
      });

      if (response.ok) {
        const data = await response.json(); // Parse response
        setRecipes((prevRecipes) => [...prevRecipes, data.recipe]); // Update recipes state
        setShowNewRecipeForm(false); // Hide form after submission
        setNewRecipe({ // Reset new recipe state
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

  // Update form fields in state
  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value }); // Update corresponding field
  };

  return (
    <div className="app">
      <Header showRecipeForm={showRecipeForm} />
      {showNewRecipeForm ? (
        <NewRecipeForm 
          newRecipe={newRecipe} 
          onUpdateForm={onUpdateForm} 
          handleNewRecipe={handleNewRecipe}
          hideRecipeForm={hideRecipeForm}
        />
      ) : (
        <div className="recipe-list">
          {recipes.map(recipe => (
            <RecipeExcerpt 
              key={recipe.id} 
              recipe={recipe} 
              handleSelectRecipe={handleSelectRecipe}
            />
          ))}
        </div>
      )}
      {selectedRecipe && (
        <RecipeFull 
          selectedRecipe={selectedRecipe} 
          handleUnselectRecipe={handleUnselectRecipe} 
        />
      )}
    </div>
  );
};

export default App;
