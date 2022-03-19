import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import * as Leagues from "./leagues.actions";

import * as fromApp from "../../../core/store/app.reducer";
import { environment } from "src/environments/environment";

@Injectable()
export class LeagueEffects {
  @Effect()
  fetchLeagues = this.actions$.pipe(
    ofType(Leagues.GET_LEAGUES),
    switchMap(() => {
      return this.http.get<any[]>(environment.api + "/leagues", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          /*'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGQ2YWY2NjE5OTY1MWFjOGViMjg1NyIsImlhdCI6MTU4NjUxMjA1OSwiZXhwIjoxNTg2NTEzMDU5fQ.S4BXGPYVWTvIY6G4DAppWQHgoB2QAy0Bbh9ElGwhy3U'*/
        }),
      });
    }),
    map((leagues) => {
      return new Leagues.SetAllLeagues(leagues);
    })
  );

  @Effect()
  fetchMatches = this.actions$.pipe(
    ofType(Leagues.GET_MATCHES),
    switchMap((action) => {
      return this.http.get<any[]>(
        environment.api + `/leagues/${(action as any).payload}/matches`,
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
        }
      );
    }),
    map((matches) => {
      return new Leagues.SetMatchess(matches);
    })
  );

  @Effect()
  fetchStandings = this.actions$.pipe(
    ofType(Leagues.GET_STANDINGS),
    switchMap((action) => {
      return this.http.get<any>(
        environment.api + `/leagues/${(action as any).payload}/standings`,
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
        }
      );
    }),
    map((standings) => {
      return new Leagues.SetStandings(
        standings.data.filter(
          (standing) =>
            standing._id === null || standing._id.startsWith("GROUP_")
        )
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
