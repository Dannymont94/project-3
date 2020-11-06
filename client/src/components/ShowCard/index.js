import React from 'react';

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
    </div>
  );
}

export default ShowCard;