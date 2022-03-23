import ICompetition from '../../../models/competition/competition-interface';
import IMatchday from '../../../models/competition/match-day-interface';
import ITeam from '../../../models/team/team-interface';
import * as LeaguesActions from './leagues.actions';

export interface State {
  teams: ITeam[];
  leagues: ICompetition[];
  matches: IMatchday[];
}

export function leaguesReducer(
  state = { leagues: [] },
  action: any // FavouriteActions.FavouriteActions
) {
  switch (action.type) {
    case LeaguesActions.SET_MATCHES:
      const newStateWithMatches = { ...state };
      newStateWithMatches.leagues = [{ code: action.payload[0].code }];
      const league1 = newStateWithMatches.leagues.find(
        (leagues) => leagues.code === action.payload[0].code
      );
      league1.matches = action.payload;
      return newStateWithMatches;

    case LeaguesActions.SET_STANDINGS:
      const newState = { ...state };
      newState.leagues = [{ code: action.payload[0].code }];
      const league = newState.leagues.find((leagues) => leagues.code === action.payload[0].code);
      league.standings = action.payload;
      return newState;

    case LeaguesActions.SET_LEAGUES:
      return {
        ...state,
        leagues: [...action.payload],
      };
    case LeaguesActions.TRACK_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues, action.payload],
      };
    case LeaguesActions.UNTRACK_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues, action.payload],
      };
    default:
      return state;
  }
}
