import * as FavouriteActions from './favourite.actions';

export interface State {
  teams: any[];
  leagues: any[];
  matches: any[];
}

const initialState: State = {
  teams: [],
  leagues: [],
  matches: [],
};

export function favouriteReducer(state = initialState, action: FavouriteActions.FavouriteActions) {
  switch (action.type) {
    case FavouriteActions.LOAD_TEAMS: {
      return {
        ...state,
        teams: action.payload,
      };
    }
    case FavouriteActions.LOAD_MATCHES: {
      return {
        ...state,
        matches: action.payload,
      };
    }
    case FavouriteActions.LOAD_LEAGUES: {
      return {
        ...state,
        leagues: action.payload,
      };
    }
    case FavouriteActions.CLEAN_STORAGE: {
      return initialState;
    }
    default:
      return state;
  }
}
