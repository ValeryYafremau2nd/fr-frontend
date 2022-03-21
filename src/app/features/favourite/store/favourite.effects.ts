import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as FavouriteActions from './favourite.actions';
import * as fromApp from '../../../core/store/app.reducer';
import { environment } from 'src/environments/environment';

@Injectable()
export class FavouriteEffects {
  @Effect()
  fetchFavouriteMatches = this.actions$.pipe(
    ofType(FavouriteActions.GET_MATCHES),
    switchMap(() => {
      return this.http.get<any[]>(environment.api + '/favourite/matches');
    }),
    map((res: any) => {
      return new FavouriteActions.LoadMatches(res.results);
    })
  );
  @Effect()
  fetchFavouriteTeams = this.actions$.pipe(
    ofType(FavouriteActions.GET_TEAMS),
    switchMap(() => {
      return this.http.get<any[]>(environment.api + '/favourite/teams');
    }),
    map((res: any) => {
      const teamIds = [];
      const filtered = res.results.filter((team) => {
        if (!teamIds.includes(team.id)) return teamIds.push(team.id);
      });
      return new FavouriteActions.LoadTeams(filtered);
    })
  );
  @Effect()
  fetchFavourites = this.actions$.pipe(
    ofType(FavouriteActions.GET_LEAGUES),
    switchMap(() => {
      return this.http.get<any[]>(environment.api + '/favourite/leagues');
    }),
    map((res: any) => {
      return new FavouriteActions.LoadLeagues(res.results.leagues);
    })
  );
  @Effect()
  addMatch = this.actions$.pipe(
    ofType(FavouriteActions.ADD_MATCH),
    switchMap((actionData: any) => {
      return this.http.post<any[]>(environment.api + '/favourite/match', {
        match: actionData.payload,
      });
    }),
    map((res: any) => {
      return new FavouriteActions.MatchAdded(res.res);
    })
  );
  @Effect()
  removeMatch = this.actions$.pipe(
    ofType(FavouriteActions.REMOVE_MATCH),
    switchMap((actionData: any) => {
      return this.http.delete<any[]>(environment.api + `/favourite/match/${actionData.payload}`);
    }),
    map((res: any) => {
      return new FavouriteActions.MatchRemoved(res.results);
    })
  );
  @Effect()
  addTeam = this.actions$.pipe(
    ofType(FavouriteActions.ADD_TEAM),
    switchMap((actionData: any) => {
      return this.http.post<any[]>(environment.api + '/favourite/team', {
        team: actionData.payload,
      });
    }),
    map((res: any) => {
      return new FavouriteActions.TeamAdded(res.res);
    })
  );
  @Effect()
  removeTeam = this.actions$.pipe(
    ofType(FavouriteActions.REMOVE_TEAM),
    switchMap((actionData: any) => {
      return this.http.delete<any[]>(environment.api + `/favourite/team/${actionData.payload}`);
    }),
    map((res: any) => {
      return new FavouriteActions.TeamRemoved(res.results);
    })
  );
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
