import gql from 'graphql-tag';

export const QUERY_USER = gql`
  {
    user {
      username
      interestedCount
      interested {
        id
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
        id
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
        id
        name
        summary
        image
        genres
        network
        status
        rating
      }
      notInterestedCount
      notInterested {
        id
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