import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShowCard from '../components/ShowCard';

function Profile() {
    const state = useSelector(state => state);

    state.searchSubmitted = false;

    const [profileView, setProfileView] = useState('interested');

    function radioButtonHandler(event) {
        setProfileView(event.target.value);
    }

    return (
        <div>
            <form onChange={radioButtonHandler}>
                <input type="radio" id="interested" name="view" value="interested" />
                <label htmlFor="interested">Interested</label>
                <br />
                <input type="radio" id="watching" name="view" value="watching" />
                <label htmlFor="watching">Watching</label>
                <br />
                <input type="radio" id="completed" name="view" value="completed" />
                <label htmlFor="completed">Completed</label>
                <br />
                <input type="radio" id="not-interested" name="view" value="notInterested" />
                <label htmlFor="not-interested">Not Interested</label>
            </form>

            <section className="grid-container">
                {state[profileView].length > 0 && (
                    state[profileView].map((showData, i) => (
                        <ShowCard key={i} show={showData}/>
                    ))
                )}
                {state[profileView].length === 0 && (
                    'No shows saved'
                )}
            </section>
        </div>
    );
};

export default Profile;