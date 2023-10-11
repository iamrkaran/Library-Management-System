import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchModal(value) {
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          placeholder='Search for a book ID'
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
    </>
  );
}

export default SearchModal;