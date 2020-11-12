import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { STORE_USER_DATA } from "../utils/actions";
import Search from '../components/Search';
import ShowCard from '../components/ShowCard';

function Home() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { data } = useQuery(QUERY_USER);
    let user = useRef(null);

    useEffect(() => {
        if (data && state && data.user && !state.dataQueried) {
            user.current = data.user;

            dispatch({
                type: STORE_USER_DATA,
                payload: user.current
            });

        }
    }, [data]);

    return (
        <div className="home">
            <h1>Home Page</h1>
            <Search mode={'Home'} />
            <section className="grid-container">
                {state.searchResults.length > 0 && (
                    state.searchResults.map((showData, i) => (
                        <ShowCard key={showData.show.id} show={showData.show} />
                    ))
                )}
                {state.searchSubmitted && state.searchResults.length === 0 && (
                    <h3>No shows found</h3>
                )}
            </section>
        </div>
    );
}

export default Home;
