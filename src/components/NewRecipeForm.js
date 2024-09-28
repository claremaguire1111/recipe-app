import React from "react";

const NewRecipeForm = ({ newRecipe, onUpdateForm, handleNewRecipe, hideRecipeForm }) => {
    return (
        <div className='recipe-details'>
            <div className='recipe-form'>
                <h2>New Recipe</h2>
                <button className='cancel-button' onClick={hideRecipeForm}>Cancel</button>
                <form onSubmit={(e) => handleNewRecipe(e, newRecipe)}>
                    <label>Title</label>
                    <input type='text' name='title' value={newRecipe.title} onChange={onUpdateForm} required />

                    <label>Ingredients</label>
                    <textarea
                        name='ingredients'
                        value={newRecipe.ingredients}
                        onChange={onUpdateForm}
                        required
                        placeholder='Add ingredients separated by commas - i.e. Flour, sugar, almonds'
                    />

                    <label>Instructions</label>
                    <textarea name='instructions' value={newRecipe.instructions} onChange={onUpdateForm} required />

                    <label>Description</label>
                    <textarea name='description' value={newRecipe.description} onChange={onUpdateForm} required />

                    <label>Image</label>
                    <input type='text' name='image_url' value={newRecipe.image_url} onChange={onUpdateForm} required />

                    <label>Servings</label>
                    <input type='number' name='servings' value={newRecipe.servings} onChange={onUpdateForm} required />

                    <button type='submit'>Save Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default NewRecipeForm;
