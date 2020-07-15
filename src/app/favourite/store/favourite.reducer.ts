// import { Recipe } from '../recipe.model';
import * as FavouriteActions from './favourite.actions';

export interface State {
  // recipes: Recipe[];
  teams: any[];
  leagues: any[];
  matches: any[];
}

const initialState: State = {
  teams: [],
  leagues: [],
  matches: []
};

export function favouriteReducer(
  state = initialState,
  action: FavouriteActions.FavouriteActions
) {
  switch (action.type) {
    case FavouriteActions.LOAD_TEAMS: {
      return {
        ...state,
        teams: action.payload
      };}
      case FavouriteActions.LOAD_MATCHES: {
        return {
          ...state,
          matches: action.payload
        };}
    case FavouriteActions.LOAD_LEAGUES: {
      return {
        ...state,
        leagues: action.payload
      };}
      case FavouriteActions.CLEAN_STORAGE: {
        return initialState;}/*
    case FavouriteActions.ADD_LEAGUE: {
      return {
        ...state,
        leagues: [...state.leagues, action.payload]
      };}
    case FavouriteActions.ADD_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };
    case FavouriteActions.ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, action.payload]
      };
    case FavouriteActions.REMOVE_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues.filter(league => league.id !== action.payload)]
      };
    case FavouriteActions.REMOVE_TEAM:
      return {
        ...state,
        teams: [...state.leagues.filter(team => team.id !== action.payload)]
      };
    case FavouriteActions.REMOVE_MATCH:
      return {
        ...state,
        matches: [...state.leagues.filter(match => match.id !== action.payload)]
      };*/
    default:
      return state;
  }
}
