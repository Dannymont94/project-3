import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import store from './utils/store';
import NoMatch from '../src/pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Nav />
          {/* always visible components go outside of Switch component */}
          <Switch>
            {/* pages that will be loaded based on url go inside of Switch component */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route component={NoMatch} />
          </Switch>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
