import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_TRACKED_SHOWS } from '../../utils/actions';
import Auth from '../../utils/auth';

function ShowCard({ show }) {
  const dispatch = useDispatch();

  const [showSavedIn, setShowSavedIn] = useState('');

  function handleSelect(event) {
    const newCategory = event.target.value;
    const oldCategory = event.target.dataset.value;

    dispatch({
      type: UPDATE_TRACKED_SHOWS,
      newCategory,
      oldCategory,
      payload: { ...show }
    });
    
    setShowSavedIn(newCategory);
  }

  return (
    <div className="card">
        <img className="card-img" src={show.image ? show.image.medium : '/images/placeholder.jpg'} alt={`${show.name} promotional art`}/>
        <div>
          <h3>{show.name}</h3>
        </div>
        <p>{show.genres?.length === 0 ? "No Genre Data" : show.genres.join('/')}</p>
        <p>{show.network ? show.network.name : 'No Network Data'} | {show.status}</p>
        <p>{show.rating.average ? show.rating.average : "No Rating Data"}</p>
        {Auth.loggedIn() ? (
          <select data-value={showSavedIn} value={showSavedIn} onChange={handleSelect}>
            <option disabled value="">Track This Show</option>
            <option value="interested">Interested</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="notInterested">Not Interested</option>
          </select>
        ) : (
          <p>Login to track!</p>
        )}
    </div>
  );
}

export default ShowCard;