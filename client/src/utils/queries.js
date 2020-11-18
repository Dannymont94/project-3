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
        url
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
        url
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
        url
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
        url
      }
    }
  }
`;