import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_SHOWS = gql`
  mutation updateShows($oldCategory: String, $newCategory: String, $show: ShowInput) {
    updateShows(oldCategory: $oldCategory, newCategory: $newCategory, show: $show) {
      username
      interestedCount
      interested {
        id
        name
      }
      watchingCount
      watching {
        id
        name
      }
      completedCount
      completed {
        id
        name
      }
      notInterestedCount
      notInterested {
        id
        name
      }
    }
  }
`;