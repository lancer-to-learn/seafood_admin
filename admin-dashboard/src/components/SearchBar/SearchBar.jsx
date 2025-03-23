import React from 'react'
import './searchBar.css'

function SearchBar() {
  return (
    <div className='search-bar'>
        <form className='search-form d-flex align-items-center' action='#' method='POST'>
            <input name='query' type='text' placeholder='Search' title='Enter search keyword'/>
            <button title='Search' type='submit'>
                <i className='bi bi-search'></i>
            </button>
        </form>
    </div>
  )
}

export default SearchBar