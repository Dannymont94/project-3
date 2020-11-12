import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShowCard from '../components/ShowCard';

function Profile() {
    const state = useSelector(state => state);

    if (state.searchSubmitted) {
        state.searchSubmitted = false;
    }

    const [profileView, setProfileView] = useState('');

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

            <div className="content-background">
                {state[profileView]?.length > 0 && (
                    <section className="showcard-container">
                        {state[profileView].map((showData, i) => (
                            <ShowCard key={showData.id} show={showData} />
                        ))}
                    </section>
                )}
                {state[profileView]?.length === 0 && profileView === 'interested' && (
                    <h3 className="error-text">You haven't saved any shows you're interested in!</h3>
                )}
                {state[profileView]?.length === 0 && profileView === 'watching' && (
                    <h3 className="error-text">You haven't saved any shows you're currently watching!</h3>
                )}
                {state[profileView]?.length === 0 && profileView === 'completed' && (
                    <h3 className="error-text">You haven't saved any shows you've completed!</h3>
                )}
                {state[profileView]?.length === 0 && profileView === 'notInterested' && (
                    <h3 className="error-text">You haven't saved any shows you're not interested in!</h3>
                )}
            </div>
        </div>
    );
};

export default Profile;