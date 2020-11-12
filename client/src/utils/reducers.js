import {
  UPDATE_SEARCH_RESULTS,
  UPDATE_TRACKED_SHOWS,
  STORE_USER_DATA
} from './actions';

const initialState = {
  searchSubmitted: false,
  dataQueried: false,
  username: '',
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
      if (!action.newCategory) {
        return {
          ...state,
          [action.oldCategory]: state[action.oldCategory].filter(shows => shows.id !== action.payload.id)
        };
      } else if (!action.oldCategory) {
        return {
          ...state,
          [action.newCategory]: [...state[action.newCategory], action.payload]
        };
      } else {
        return {
          ...state,
          [action.newCategory]: [...state[action.newCategory], action.payload],
          [action.oldCategory]: state[action.oldCategory].filter(shows => shows.id !== action.payload.id)
        };
      }
    case STORE_USER_DATA:
      return {
        ...state,
        dataQueried: true,
        username: action.payload.username,
        interested: [...action.payload.interested],
        watching: [...action.payload.watching],
        completed: [...action.payload.completed],
        notInterested: [...action.payload.notInterested],
      }
    default:
      return state;
  }
};