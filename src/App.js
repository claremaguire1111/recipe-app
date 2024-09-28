import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RecipeExcerpt from './components/RecipeExcerpt';
import RecipeFull from './components/RecipeFull';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleUnselectRecipe = () => {
        setSelectedRecipe(null);
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
            <Header />
            {selectedRecipe && (
                <RecipeFull 
                    selectedRecipe={selectedRecipe} 
                    handleUnselectRecipe={handleUnselectRecipe} 
                />
            )}
            {!selectedRecipe && (
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
