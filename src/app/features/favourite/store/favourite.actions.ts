import { Action } from '@ngrx/store';

export const LOAD_MATCHES = '[Favourite] Load mathces';
export const LOAD_TEAMS = '[Favourite] Load teams';
export const LOAD_LEAGUES = '[Favourite] Load leagues';
export const ADD_TEAM = '[Favourite] Add team';
export const ADD_MATCH = '[Favourite] Add match';
export const ADD_LEAGUE = '[Favourite] Add league';
export const TEAM_REMOVED = '[Favourite] Team removed';
export const MATCH_REMOVED = '[Favourite] Match removed';
export const LEAGUE_REMOVED = '[Favourite] League removed';
export const TEAM_ADDED = '[Favourite] Team added';
export const MATCH_ADDED = '[Favourite] Match added';
export const LEAGUE_ADDED = '[Favourite] League added';
export const REMOVE_TEAM = '[Favourite] Remove team';
export const REMOVE_MATCH = '[Favourite] Remove match';
export const REMOVE_LEAGUE = '[Favourite] Remove league';
export const GET_TEAMS = '[Favourite] Get teams';
export const GET_LEAGUES = '[Favourite] Get leagues';
export const GET_MATCHES = '[Favourite] Get matches';
export const CLEAN_STORAGE = '[Favourite] Clean storage';

export class CleanStorage implements Action {
  readonly type = CLEAN_STORAGE;

  constructor() {}
}

export class LoadMatches implements Action {
  readonly type = LOAD_MATCHES;

  constructor(public payload: any) {}
}

export class LoadTeams implements Action {
  readonly type = LOAD_TEAMS;

  constructor(public payload: any) {}
}

export class LoadLeagues implements Action {
  readonly type = LOAD_LEAGUES;

  constructor(public payload: any) {}
}

export class AddTeam implements Action {
  readonly type = ADD_TEAM;

  constructor(public payload: any) {}
}

export class AddLeague implements Action {
  readonly type = ADD_LEAGUE;

  constructor(public payload: any) {}
}

export class AddMatch implements Action {
  readonly type = ADD_MATCH;

  constructor(public payload: any) {}
}

export class TeamRemoved implements Action {
  readonly type = TEAM_REMOVED;

  constructor(public payload: any) {}
}

export class LeagueRemoved implements Action {
  readonly type = LEAGUE_REMOVED;

  constructor(public payload: any) {}
}

export class MatchRemoved implements Action {
  readonly type = MATCH_REMOVED;

  constructor(public payload: any) {}
}

export class TeamAdded implements Action {
  readonly type = TEAM_ADDED;

  constructor(public payload: any) {}
}

export class LeagueAdded implements Action {
  readonly type = LEAGUE_ADDED;

  constructor(public payload: any) {}
}

export class MatchAdded implements Action {
  readonly type = MATCH_ADDED;

  constructor(public payload: any) {}
}

export class RemoveTeam implements Action {
  readonly type = REMOVE_TEAM;

  constructor(public payload: any) {}
}

export class RemoveLeague implements Action {
  readonly type = REMOVE_LEAGUE;

  constructor(public payload: any) {}
}

export class RemoveMatch implements Action {
  readonly type = REMOVE_MATCH;

  constructor(public payload: any) {}
}

export class GetFavouriteTeams implements Action {
  readonly type = GET_TEAMS;
}

export class GetFavouriteLeagues implements Action {
  readonly type = GET_LEAGUES;
}

export class GetFavouriteMathes implements Action {
  readonly type = GET_MATCHES;
}

export type FavouriteActions =
  | LoadMatches
  | LoadTeams
  | LoadLeagues
  | AddLeague
  | AddMatch
  | AddTeam
  | RemoveLeague
  | RemoveMatch
  | RemoveTeam
  | GetFavouriteLeagues
  | GetFavouriteMathes
  | GetFavouriteTeams
  | CleanStorage;
