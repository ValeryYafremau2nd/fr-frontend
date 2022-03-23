import ICompetition from '../../../models/competition/competition-interface';
import IMatchday from '../../../models/competition/match-day-interface';
import ITeam from '../../../models/team/team-interface';
import * as FavouriteActions from './favourite.actions';

export interface State {
  teams: ITeam[];
  leagues: ICompetition[];
  matches: IMatchday[];
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
