import React from 'react';
import { useSelector } from 'react-redux';
import Search from '../components/Search';
import ShowCard from '../components/ShowCard';

function Home() {
    const state = useSelector(state => state);

    return (
        <div>
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
