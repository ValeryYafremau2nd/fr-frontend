import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as Leagues from './leagues.actions';

import * as fromApp from '../../../core/store/app.reducer';
import { environment } from '../../../../environments/environment';
import Response from '../../../models/response.model';
import ICompetition from '../../../models/competition/competition-interface';
import IMatchday from '../../../models/competition/match-day-interface';
import IStanding from '../../../models/competition/standing-interface';

@Injectable()
export class LeagueEffects {
  @Effect()
  fetchLeagues = this.actions$.pipe(
    ofType(Leagues.GET_LEAGUES),
    switchMap(() => {
      return this.http.get(environment.api + '/leagues', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }),
    map((res: Response) => {
      return new Leagues.SetAllLeagues(res.data as ICompetition[]);
    })
  );

  @Effect()
  fetchMatches = this.actions$.pipe(
    ofType(Leagues.GET_MATCHES),
    switchMap((action: {type: string; payload: IMatchday[]}) => {
      return this.http.get(environment.api + `/leagues/${action.payload}/matches`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }),
    map((res: Response) => {
      return new Leagues.SetMatchess(res.data as IMatchday[]);
    })
  );

  @Effect()
  fetchStandings = this.actions$.pipe(
    ofType(Leagues.GET_STANDINGS),
    switchMap((action: {type: string; payload: ICompetition[]}) => {
      return this.http.get(environment.api + `/leagues/${action.payload}/standings`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }),
    map((res: Response) => {
      return new Leagues.SetStandings(
        (res.data as IStanding[]).filter((standing) => standing._id === null || standing._id.startsWith('GROUP_'))
      );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
