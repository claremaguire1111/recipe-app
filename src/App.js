import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RecipeExcerpt from './components/RecipeExcerpt';
import RecipeFull from './components/RecipeFull';
import NewRecipeForm from './components/NewRecipeForm';

function App() {
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

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleUnselectRecipe = () => {
        setSelectedRecipe(null);
    };

    const hideRecipeForm = () => {
        setShowNewRecipeForm(false);
    };

    const showRecipeForm = () => {
        setShowNewRecipeForm(true);
        setSelectedRecipe(null);
    };

    const onUpdateForm = (e) => {
        const { name, value } = e.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const response = await fetch('/api/recipes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchAllRecipes();
    }, []);

    return (
        <div className="App">
            <Header showRecipeForm={showRecipeForm} />
            {selectedRecipe && (
                <RecipeFull 
                    selectedRecipe={selectedRecipe} 
                    handleUnselectRecipe={handleUnselectRecipe} 
                />
            )}
            {showNewRecipeForm && (
                <NewRecipeForm 
                    newRecipe={newRecipe} 
                    onUpdateForm={onUpdateForm} 
                    hideRecipeForm={hideRecipeForm} 
                />
            )}
            {!selectedRecipe && !showNewRecipeForm && (
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
        </div>
    );
}

export default App;

