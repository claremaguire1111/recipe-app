import React from "react";
import { truncateText } from "../helpers/utils"; // Import the utility function

const RecipeExcerpt = ({ recipe, handleSelectRecipe, handleDeleteRecipe }) => {
  return (
    <div className="recipe-excerpt">
      <h2>{recipe.title}</h2>
      <p>{truncateText(recipe.description)}</p> {/* Use truncateText function */}
      <button onClick={() => handleSelectRecipe(recipe)}>View</button>
      <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
    </div>
  );
};

export default RecipeExcerpt;
