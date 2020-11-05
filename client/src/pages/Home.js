import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { UPDATE_SHOWS } from '../utils/actions';

function Home() {
    const [formState, setFormState] = useState('');

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    function handleChange(event) {
        setFormState(event.target.value);
    }

    async function getShows(event) {
        event.preventDefault();

        const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${formState}`);
        dispatch({
            type: UPDATE_SHOWS,
            payload: response.data
        });
    }

    return (
        <div>
            <h1>Home Page</h1>
            <form onSubmit={getShows}>
                <input id="searchInput" type="text" value={formState} onChange={handleChange}/>
                <button type="submit">Search</button>
            </form>
            {state.shows.length > 0 ? (
                state.shows.map((show, i) => (
                    <div key={i}>
                        <p>{show.show.name}</p>
                        <p>{show.show.genres.length > 1 ? `${show.show.genres[0]}, ${show.show.genres[1]}` : show.show.genres[0]}</p>
                        <p>{show.show.status}</p>
                        <p>{show.show.network ? show.show.network.name : 'null'}</p>
                        <img src={show.show.image ? show.show.image.medium : 'null'}/>
                        <p>{show.show.rating.average}</p>
                    </div>
                ))
            ) : (
                ''
            )}
        </div>
    );
};

export default Home;