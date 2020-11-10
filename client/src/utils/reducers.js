import {
  UPDATE_SEARCH_RESULTS,
  UPDATE_TRACKED_SHOWS
} from './actions';

const initialState = {
  searchSubmitted: false,
  searchResults: [],
  interested: [],
  watching: [],
  completed: [],
  notInterested: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchSubmitted: true,
        searchResults: [...action.payload]
      };
    case UPDATE_TRACKED_SHOWS:
      return {
        ...state,
        [action.newCategory]: [ ...state[action.newCategory], action.payload],
        [action.oldCategory]: [action.oldCategory].filter(shows => shows.id !== action.payload.id)
      }
    default:
      return state;
  }
};