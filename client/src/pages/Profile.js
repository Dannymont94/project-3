import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { STORE_USER_DATA } from "../utils/actions";
import ShowCard from '../components/ShowCard';

function Profile() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { data } = useQuery(QUERY_USER);

    if (data && state && data.user && !state.dataQueried) {
        dispatch({
            type: STORE_USER_DATA,
            payload: data.user
        });
    }

    if (state.searchSubmitted) {
        state.searchSubmitted = false;
    }

    const [profileView, setProfileView] = useState('');

    function radioButtonHandler(event) {
        setProfileView(event.target.value);
    }

    return (
        <div>
            <div className="radio-form-container">
                <form className="radio-form" onChange={radioButtonHandler}>
                    <div>
                        <input type="radio" id="interested" name="view" value="interested" />
                        <label htmlFor="interested"> Interested </label>
                    </div>
                    <span className="separator-span">|</span>
                    <div>
                        <input type="radio" id="watching" name="view" value="watching" />
                        <label htmlFor="watching"> Watching </label>
                    </div>
                    <span className="separator-span">|</span>
                    <div>
                        <input type="radio" id="completed" name="view" value="completed" />
                        <label htmlFor="completed"> Completed </label>
                    </div>
                    <span className="separator-span">|</span>
                    <div>
                        <input type="radio" id="not-interested" name="view" value="notInterested" />
                        <label htmlFor="not-interested"> Not Interested </label>
                    </div>
                </form>
            </div>

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