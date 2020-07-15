// import { Recipe } from '../recipe.model';
import * as LeaguesActions from './leagues.actions';

/*export interface State {
  // recipes: Recipe[];
  teams: any[];
  leagues: any[];
  matches: any[];
}*/


export function leaguesReducer(
  state = {leagues: []},
  action: any// FavouriteActions.FavouriteActions
) {
  switch (action.type) {
    case LeaguesActions.SET_MATCHES:
      const newStateWithMatches = { ...state };
      newStateWithMatches.leagues = [{ id: action.payload.data[0].competitionId }];
      const league1 = newStateWithMatches.leagues.find(leagues => leagues.id === action.payload.data[0].competitionId);
      league1.matches = action.payload.data;
      return newStateWithMatches;

    case LeaguesActions.SET_STANDINGS:
      const newState = { ...state };
      newState.leagues = [{id: action.payload.data[0].competitionId}];
      const league = newState.leagues.find(leagues => leagues.id === action.payload.data[0].competitionId);
      league.standings = action.payload.data;
      return newState;

    case LeaguesActions.SET_LEAGUES:
      return {
        ...state,
        leagues: [...action.payload]
      };
    case LeaguesActions.TRACK_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues, action.payload]
      };
    case LeaguesActions.UNTRACK_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues, action.payload]
      };
    default:
      return state;
  }
}
