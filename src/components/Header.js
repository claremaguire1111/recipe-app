import React from "react";

const Header = ({ showRecipeForm, searchTerm, updateSearchTerm, displayAllRecipes }) => {
  return (
    <header>
      <h1 onClick={displayAllRecipes} style={{ cursor: "pointer" }}>My Favorite Recipes</h1>
      <button className="new-recipe" onClick={showRecipeForm}>Add New Recipe</button>
      <input 
        type="text" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)} 
      />
    </header>
  );
};

export default Header;
