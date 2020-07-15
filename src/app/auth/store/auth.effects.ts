import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, map, withLatestFrom, catchError, mapTo, tap } from 'rxjs/operators';
import * as Auth from './auth.actions';
import * as Favourite from '../../favourite/store/favourite.actions';

import * as fromApp from '../../store/app.reducer';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthEffects {
  @Effect()
  logout = this.actions$.pipe(
    ofType(Auth.LOGOUT),
    switchMap((actionData: any) => {
      return this.http.get<any[]>(
        environment.api + '/api/v1/auth/logout'
      ).pipe(
        catchError((err) => {
          return throwError(err);
        }),
      );
    }),
    map((res: any) => {
      this.router.navigate(['/auth/login']);
      return new Auth.LoggedOut();
    }),
    mapTo(new Favourite.CleanStorage())
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(Auth.LOGIN),
    switchMap((actionData: any) => {
      return this.http.post<any[]>(
        environment.api + '/api/v1/auth/login',
        {
          email: actionData.payload.email,
          password: actionData.payload.password
        },
        {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        }
      ).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }),
    map((res: any) => {
      localStorage.setItem('fr_token', res.token);
      return new Auth.Loggedin({
        token: res.token,
        exp: Date.now() + res.expiresIn,
        usr: res.data.user
      });
    }),
    tap(() => this.router.navigate(['']))
  );

  @Effect()
  signup = this.actions$.pipe(
    ofType(Auth.SIGNUP),
    switchMap((actionData: any) => {
      return this.http.post<any[]>(
        environment.api + '/api/v1/auth/signup',
        {
          email: actionData.payload.email,
          password: actionData.payload.password
        },
        {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        }
      ).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }),
    map((res: any) => {
      localStorage.setItem('fr_token', res.token);
      return new Auth.Loggedin({
        token: res.token,
        exp: Date.now() + res.expiresIn,
        usr: res.data.user
      });
    }),
    tap(() => this.router.navigate(['']))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
