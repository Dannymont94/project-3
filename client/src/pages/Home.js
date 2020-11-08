import React from 'react';
import { useSelector } from 'react-redux';
import Search from '../components/Search';
import ShowCard from '../components/ShowCard';

function Home() {
    const state = useSelector(state => state);

    return (
        <div>
            <h1>Home Page</h1>
            <Search mode={'Home'}/>
            <section className="grid-container">
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
