import React, { useState, useEffect } from 'react';
import axios from 'axios';


//  '../api';

function SearchModal(value) {
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      
    </>
  );
}

export default SearchModal;