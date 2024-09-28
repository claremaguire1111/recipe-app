import React, { useState } from "react";
import { X } from "react-feather"; // Make sure this is imported
import ConfirmationModal from "./ConfirmationModal"; // Add this line

const RecipeFull = ({ selectedRecipe, handleUnselectRecipe, handleDeleteRecipe }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <div className="recipe-details">
      <article>
        <header>
          <figure>
            <img src={selectedRecipe.image_url} alt={selectedRecipe.title} />
          </figure>
          <h2>{selectedRecipe.title}</h2>
          <div className="button-container">
            <button className="edit-button">Edit</button>
            <button className="cancel-button" onClick={handleUnselectRecipe}>
              <X /> Close
            </button>
            <button 
              className="delete-button" 
              onClick={() => setShowConfirmationModal(true)}
            >
              Delete
            </button>
          </div>
        </header>

        <h3>Description:</h3>
        <p>{selectedRecipe.description}</p>

        <h3>Ingredients:</h3>
        <ul className="ingredient-list">
          {selectedRecipe.ingredients.split(',').map((ingredient, index) => (
            <li className="ingredient" key={index}>
              {ingredient.trim()}
            </li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <pre className="formatted-text">{selectedRecipe.instructions}</pre>

        <h3>Servings: {selectedRecipe.servings}</h3>
      </article>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this recipe?"
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={() => handleDeleteRecipe(selectedRecipe.id)} // Confirm delete
        />
      )}
    </div>
  );
};

export default RecipeFull;

