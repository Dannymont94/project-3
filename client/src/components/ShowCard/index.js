import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SHOWS } from "../../utils/mutations";
import { UPDATE_TRACKED_SHOWS } from '../../utils/actions';
import Auth from '../../utils/auth';

function ShowCard({ show }) {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [updateShows] = useMutation(UPDATE_SHOWS);

  const [showSavedIn, setShowSavedIn] = useState('');

  if (state.interested.find(trackedShow => trackedShow.id === show.id) && showSavedIn !== 'interested') {
    setShowSavedIn('interested');
  } else if (state.watching.find(trackedShow => trackedShow.id === show.id) && showSavedIn !== 'watching') {
    setShowSavedIn('watching');
  } else if (state.completed.find(trackedShow => trackedShow.id === show.id) && showSavedIn !== 'completed') {
    setShowSavedIn('completed');
  } else if (state.notInterested.find(trackedShow => trackedShow.id === show.id) && showSavedIn !== 'notInterested') {
    setShowSavedIn('notInterested');
  }

  async function handleSelect(event) {
    const newCategory = event.target.value;
    const oldCategory = event.target.dataset.value;

    if (!newCategory && !oldCategory) return;
    if (newCategory === oldCategory) return;

    dispatch({
      type: UPDATE_TRACKED_SHOWS,
      newCategory,
      oldCategory,
      payload: { ...show }
    });
    
    setShowSavedIn(newCategory);

    await updateShows({
      variables: {
        newCategory,
        oldCategory,
        show: {
          id,
          name,
          image,
          genres,
          network,
          status,
          rating,
          summary,
          url
        }
      }
    });
  }

  const id = show.id;
  const name = show.name;
  const image = show.image?.medium ? show.image.medium :
                show.image ? show.image        :
                'https://via.placeholder.com/210x295.png?text=TV+Tracker';
  const genres = show.genres || [];
  const network = show.network ? show.network.name :
                  show.webChannel? show.webChannel.name :
                  "No Network Data";
  const status = show.status;
  const rating = show.rating?.average ? `${show.rating.average.toString()}/10 ⭐` : "No Rating Data";
  const summary = show.summary ? show.summary
                    .replace(/<[^>]*>/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .trim()
                    :
                    'No summary data';
  const url = show.url;

  return (
    <div className="card">
      <a href={url}>
        <img
          className="card-img"
          src={image}
          alt={`${name} promotional art`}
        />
      </a>
      <div className="card-body">
        <div>
          <h3>{name}</h3>
          <p>{genres?.length > 0 ? genres.join(" / ") : "No Genre Data"}</p>
        </div>
        <div>
          <p>{network}</p>
          <br />
          <p>{status}</p>
          <br />
          <p>{rating}</p>
        </div>

        {Auth.loggedIn() ? (
          <select className="card-select" data-value={showSavedIn} value={showSavedIn} onChange={handleSelect}>
            <option disabled value="">Track This Show</option>
            <option value="interested">Interested</option>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="notInterested">Not Interested</option>
            {showSavedIn && (
              <option value="">Untrack</option>
            )}
          </select>
        ) : (
          <Link to='/login'>
            Login to track!
          </Link>
        )}
      </div>
    </div>
  );
}

export default ShowCard;
