import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UPDATE_SEARCH_RESULTS } from '../../utils/actions';

function Search({ mode }) {
  const [formState, setFormState] = useState('');

  const dispatch = useDispatch();

  function handleChange(event) {
    setFormState(event.target.value);
  }

  async function getShows(event) {
    event.preventDefault();

    switch (mode) {
      case 'Home':
        if (formState) {
          const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${formState}`);
          
          dispatch({
            type: UPDATE_SEARCH_RESULTS,
            payload: response.data
          });
        }
        break;
      default:
        break;
    }
  }

  return (
      <form className="search" onSubmit={getShows}>
        <input type="text" value={formState} placeholder="Search for TV shows by name" onChange={handleChange} />
        <button type="submit"><img src="/images/search.png" alt="magnifying glass" height="45px" width="45px" /></button>
      </form>
  );
}

export default Search;