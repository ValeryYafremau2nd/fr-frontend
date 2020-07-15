import { Action } from '@ngrx/store';

export const TRACK_LEAGUE = '[Leagues] Track';
export const UNTRACK_LEAGUE = '[Leagues] Untrack';
export const GET_STRIKERS = '[Leagues] Get strikers';
export const GET_LEAGUES = '[Leagues] Get all';
export const SET_LEAGUES = '[Leagues] Set all';

export class SetAllLeagues implements Action {
  readonly type = SET_LEAGUES;

  constructor(public payload: any[]) {}
}

export class GetAllLeagues implements Action {
  readonly type = GET_LEAGUES;

  constructor() {}
}

export class TrackLeague implements Action {
  readonly type = TRACK_LEAGUE;

  constructor(public payload: number) {}
}

export class UntrackLeague implements Action {
  readonly type = UNTRACK_LEAGUE;

  constructor(public payload: number) {}
}

export class GetStrikers implements Action {
  readonly type = GET_STRIKERS;

  constructor(public payload: number) {}
}

export type LeaguesActions =
  | TrackLeague
  | UntrackLeague
  | GetStrikers
  | GetAllLeagues
  | SetAllLeagues;



export const GET_STANDINGS = '[Standing] Get';
export const SET_STANDINGS = '[Standing] Set';

export class GetStandings implements Action {
  readonly type = GET_STANDINGS;

  constructor(public payload: any) {}
}

export class SetStandings implements Action {
  readonly type = SET_STANDINGS;

  constructor(public payload: any) {}
}

export const GET_MATCHES = '[Matches] Get';
export const SET_MATCHES = '[Matches] Set';

export class GetMatches implements Action {
  readonly type = GET_MATCHES;

  constructor(public payload: any) {}
}

export class SetMatchess implements Action {
  readonly type = SET_MATCHES;

  constructor(public payload: any) {}
}

export type StandingActions =
  GetStandings
  | SetStandings;
