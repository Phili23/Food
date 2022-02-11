 import React from 'react';

import { Link } from 'react-router-dom';
import './NavBar.css'

const Nav = () => {
  return (
    <div className='nav'>
      <Link className='link' to='/home'>
        <img className='cooking' />
        <span>
        Foods Recipes
        </span>
      </Link>
      <Link className='link' to='/create'>
        <span>
          Create New Recipe
        </span>
      </Link>
        

      <Link className='link' to='/'>
        <span>
         Back
        </span>
      </Link>
      <Link className='link' to='/home/SearchBar'>
        <span>
          View Diets
        </span>
      </Link>
    </div>
    
  );
};

export default Nav; 