import React from 'react';
import Auth from '../../utils/auth';

function ShowCard({ show }) {
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
          <select>
            <option disabled selected>Track This Show</option>
            <option>Interested</option>
            <option>Watching</option>
            <option>Completed</option>
            <option>Not Interested</option>
          </select>
        ) : (
          <p>Login to track!</p>
        )}
    </div>
  );
}

export default ShowCard;