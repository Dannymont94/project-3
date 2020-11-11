import gql from 'graphql-tag';

export const QUERY_USER = gql`
  {
    user {
      username
      interestedCount
      interested {
        tvMazeId
        name
        summary
        image
        genres
        network
        status
        rating
      }
      watchingCount
      watching {
        tvMazeId
        name
        summary
        image
        genres
        network
        status
        rating
      }
      completedCount
      completed {
        tvMazeId
        name
        summary
        image
        genres
        network
        status
        rating
      }
    }
  }
`;