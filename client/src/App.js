import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import store from './utils/store';

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
          {/* always visible components go outside of Switch component */}
          <Switch>
            {/* pages that will be loaded based on url go inside of Switch component */}
            <Route component={NoMatch} />
          </Switch>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
