import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as FavouriteActions from './favourite.actions';
import * as fromApp from '../../../core/store/app.reducer';
import { environment } from '../../../../environments/environment';
import Response from '../../../models/response.model';
import ITeam from '../../../models/team/team-interface';
import IMatchday from '../../../models/competition/match-day-interface';
import ICompetition from '../../../models/competition/competition-interface';

@Injectable()
export class FavouriteEffects {
  @Effect()
  fetchFavouriteMatches = this.actions$.pipe(
    ofType(FavouriteActions.GET_MATCHES),
    switchMap(() => {
      return this.http.get(environment.api + '/favourite/matches');
    }),
    map((res: Response) => {
      return new FavouriteActions.LoadMatches(res.data as IMatchday[]);
    })
  );
  @Effect()
  fetchFavouriteTeams = this.actions$.pipe(
    ofType(FavouriteActions.GET_TEAMS),
    switchMap(() => {
      return this.http.get(environment.api + '/favourite/teams');
    }),
    map((res: Response) => {
      const teamIds = [];
      const filtered = (res.data as ITeam[]).filter((team) => {
        if (!teamIds.includes(team.id)) return teamIds.push(team.id);
      });
      return new FavouriteActions.LoadTeams(filtered);
    })
  );
  @Effect()
  fetchFavourites = this.actions$.pipe(
    ofType(FavouriteActions.GET_LEAGUES),
    switchMap(() => {
      return this.http.get(environment.api + '/favourite/leagues');
    }),
    map((res: Response) => {
      return new FavouriteActions.LoadLeagues(res.data as ICompetition[]);
    })
  );
  @Effect()
  addMatch = this.actions$.pipe(
    ofType(FavouriteActions.ADD_MATCH),
    switchMap((actionData: any) => {
      return this.http.post(environment.api + '/favourite/match', {
        match: actionData.payload,
      });
    }),
    map((res: Response) => {
      return new FavouriteActions.MatchAdded();
    })
  );
  @Effect()
  removeMatch = this.actions$.pipe(
    ofType(FavouriteActions.REMOVE_MATCH),
    switchMap((actionData: any) => {
      return this.http.delete(environment.api + `/favourite/match/${actionData.payload}`);
    }),
    map((res: Response) => {
      return new FavouriteActions.MatchRemoved();
    })
  );
  @Effect()
  addTeam = this.actions$.pipe(
    ofType(FavouriteActions.ADD_TEAM),
    switchMap((actionData: any) => {
      return this.http.post(environment.api + '/favourite/team', {
        team: actionData.payload,
      });
    }),
    map((res: Response) => {
      return new FavouriteActions.TeamAdded();
    })
  );
  @Effect()
  removeTeam = this.actions$.pipe(
    ofType(FavouriteActions.REMOVE_TEAM),
    switchMap((actionData: any) => {
      return this.http.delete(environment.api + `/favourite/team/${actionData.payload}`);
    }),
    map((res: Response) => {
      return new FavouriteActions.TeamRemoved();
    })
  );
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
