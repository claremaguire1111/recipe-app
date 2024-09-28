import React from 'react';
import { X } from 'react-feather';

const RecipeFull = ({ selectedRecipe, handleUnselectRecipe }) => {
  const { title, description, ingredients, instructions, servings, image_url } = selectedRecipe;

  return (
    <div className="recipe-details">
      <article>
        <header>
          <figure>
            <img src={image_url} alt={title} />
          </figure>
          <h2>{title}</h2>
          <div className='button-container'>
            <button className='edit-button'>Edit</button>
            <button className='cancel-button' onClick={handleUnselectRecipe}>
              <X /> Close
            </button>
            <button className='delete-button'>Delete</button>
          </div>
        </header>
 
        <h3>Description:</h3>
        <p>{description}</p>
 
        <h3>Ingredients:</h3>
        <ul className='ingredient-list'>
          {ingredients.split(',').map((ingredient, index) => (
            <li className='ingredient' key={index}>{ingredient.trim()}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <pre className='formatted-text'>{instructions}</pre>
 
        <h3>Servings: {servings}</h3>
      </article>
    </div>
  );
};

export default RecipeFull;
