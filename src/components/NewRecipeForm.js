import React from 'react';

const NewRecipeForm = ({ newRecipe, setNewRecipe, onSubmit, onCancel }) => {
  const onUpdateForm = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <div className='recipe-form'>
      <h2>Add New Recipe</h2>
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input 
          type='text' 
          name='title' 
          value={newRecipe.title} 
          onChange={onUpdateForm} 
          required 
        />

        <label>Description</label>
        <textarea 
          name='description' 
          value={newRecipe.description} 
          onChange={onUpdateForm} 
          required 
        />

        <label>Ingredients</label>
        <textarea
          name='ingredients'
          value={newRecipe.ingredients}
          onChange={onUpdateForm}
          required
          placeholder='Add ingredients separated by commas'
        />

        <label>Instructions</label>
        <textarea 
          name='instructions' 
          value={newRecipe.instructions} 
          onChange={onUpdateForm} 
          required 
        />

        <label>Servings</label>
        <input 
          type='number' 
          name='servings' 
          value={newRecipe.servings} 
          onChange={onUpdateForm} 
          required 
        />

        <label>Image URL</label>
        <input 
          type='text' 
          name='image_url' 
          value={newRecipe.image_url} 
          onChange={onUpdateForm} 
          required 
        />

        <div className="button-container">
          <button type="submit">Save Recipe</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewRecipeForm;
