import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  switchMap,
  map,
  catchError,
  mapTo,
  tap,
} from "rxjs/operators";
import * as Auth from "./auth.actions";
import * as Favourite from "../../features/favourite/store/favourite.actions";

import * as fromApp from "../../core/store/app.reducer";
import { throwError, of } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { SwPush } from "@angular/service-worker";
import IAuth from "../../models/auth.model";
import IResponseAuth from "../../models/auth.response";

@Injectable()
export class AuthEffects {
  @Effect()
  logout = this.actions$.pipe(
    ofType(Auth.LOGOUT),
    switchMap(() => {
      return this.http.get(environment.api + "/api/v1/auth/logout").pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }),
    map(() => {
      this.router.navigate(["/auth/login"]);
      return new Auth.LoggedOut();
    }),
    mapTo(new Favourite.CleanStorage())
  );

  @Effect()
  loginOauth = this.actions$.pipe(
    ofType(Auth.LOGIN_OAUTH),
    switchMap((actionData: {type: string, payload: IAuth}) => {
      return this.http
        .post(
          environment.api + "/api/v1/auth/login-oauth",
          {
            user: actionData.payload.usr,
            token: actionData.payload.token,
          },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
        )
        .pipe(
          catchError((error) => {
            return of(error.error);
          })
        );
    }),
    map((res: IResponseAuth) => {
      localStorage.setItem("fr_token", res.token);

      if (res.error) {
        return new Auth.Error(res.error);
      }

      return new Auth.Loggedin({
        token: res.token,
        exp: Date.now() + res.expiresIn,
        usr: res.data.user,
        error: res.data.error,
      });
    }),
    tap(() => this.router.navigate([""]))
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(Auth.LOGIN),
    switchMap((actionData: {type: string; payload: {email: string; password: string}}) => {
      return this.http
        .post(
          environment.api + "/api/v1/auth/login",
          {
            email: actionData.payload.email,
            password: actionData.payload.password,
          },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
        )
        .pipe(
          catchError((error) => {
            return of(error.error);
          })
        );
    }),
    map((res: IResponseAuth) => {
      localStorage.setItem("fr_token", res.token);

      if (res.error) {
        return new Auth.Error(res.error);
      }

      return new Auth.Loggedin({
        token: res.token,
        exp: Date.now() + res.expiresIn,
        usr: res.data.user,
        error: res.data.error,
      });
    }),
    tap(() => this.router.navigate([""]))
  );

  @Effect()
  signup = this.actions$.pipe(
    ofType(Auth.SIGNUP),
    switchMap((actionData:  {type: string; payload: {email: string; password: string}}) => {
      return this.http
        .post(
          environment.api + "/api/v1/auth/signup",
          {
            email: actionData.payload.email,
            password: actionData.payload.password,
          },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
            }),
          }
        )
        .pipe(
          catchError((error) => {
            return of(error.error);
          })
        );
    }),
    map((res: IResponseAuth) => {
      if (res.error) {
        return new Auth.Error(res.error);
      }
      localStorage.setItem("fr_token", res.token);
      return new Auth.Loggedin({
        token: res.token,
        exp: Date.now() + res.expiresIn,
        usr: res.data.user,
        error: res.data.error,
      });
    }),
    tap(() => this.router.navigate([""]))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private swPush: SwPush,
    private router: Router
  ) {}
}
