import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap, catchError, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<any>, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store
          .select('auth').pipe(
              take(1),
              exhaustMap(auth => {
                if (!auth.token) {
                  return next.handle(req).pipe(
                    catchError(err => {
                      if (err.status === 401) {
                        this.router.navigate(['/auth/login']);
                      }
                      return throwError(err);
                }));
                }
                const modifiedReq = req.clone({
                  headers: new HttpHeaders({
                    Authorization: `Bearer ${ auth.token }`,
                    'Content-Type': 'application/json'
                  })
                });
                return next.handle(modifiedReq).pipe(map(event => {
                  return event;
                }), catchError(err => {
                  if (err.status === 401) {
                    this.router.navigate(['/auth/login']);
                  }
                  return throwError(err);
                }));
              })
    );
  }
}
