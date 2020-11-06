import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ShowCard from '../components/ShowCard'
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
                state.shows.map((showData, i) => (
                    <ShowCard key={i} show={showData.show}/>
                ))
            ) : (
                ''
            )}
        </div>
    );
}

export default Home;