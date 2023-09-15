import React, { useState } from "react";
import EditRecipeForm from "./EditRecipeForm";

const RecipeFull = ({ selectedRecipe, handleUnselectRecipe, handleDeleteRecipe, onUpdateForm, handleUpdateRecipe }) => {
  const [editing, setEditing] = useState(false);
  const [showConfirmationModal, setShowConfirmationModel] = useState(false);

  const handleCancel = () => {
    setEditing(false);
  };

  const handleCloseModal = () => {
    setShowConfirmationModel(false);
  };

  const handleShowModal = () => {
    setShowConfirmationModel(true);
  };

  return (
    <div className='recipe-details'>
      {editing ? (
        <EditRecipeForm
          selectedRecipe={selectedRecipe}
          onUpdateForm={onUpdateForm}
          handleDeleteRecipe={handleDeleteRecipe}
          handleCancel={handleCancel}
          handleUpdateRecipe={handleUpdateRecipe}
          showConfirmationModal={showConfirmationModal}
          handleCloseModal={handleCloseModal}
          handleShowModal={handleShowModal}
        />
      ) : (
        <article>
          <header>
            <h2>{selectedRecipe.title}</h2>

            <button onClick={() => setEditing(true)}>Edit</button>
            <button className='close-button' onClick={() => handleUnselectRecipe(selectedRecipe)}>
              Close
            </button>
          </header>
          <figure>
            <img alt={selectedRecipe.title} src={selectedRecipe.image_url} />
          </figure>

          <p className='bold'>Ingredients</p>

          <ul>
            {selectedRecipe.ingredients.split(",").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p className='bold'>Instructions</p>

          <pre className='formatted-text'>{selectedRecipe.instructions}</pre>

          <p className='bold'>Servings: {selectedRecipe.servings}</p>
        </article>
      )}
    </div>
  );
};

export default RecipeFull;
