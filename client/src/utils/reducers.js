import {
  UPDATE_SHOWS
} from './actions';

const initialState = {
  shows: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SHOWS:
      return {
        ...state,
        shows: [...action.payload]
      };
    default:
      return state;
  }
};