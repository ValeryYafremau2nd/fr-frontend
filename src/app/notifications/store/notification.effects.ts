import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as NotificationActions from './notification.actions';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationEffects {
  @Effect()
  fetchTimestamps = this.actions$.pipe(
    ofType(NotificationActions.LOAD_NOTIFICATIONS),
    switchMap(() => {
      return this.http.get<any[]>(environment.api + '/timestamps');
    }),
    map((res: any) => {
      return new NotificationActions.NotificationLoaded(res.results);
    })
  );
  @Effect()
  addTimestamp = this.actions$.pipe(
    ofType(NotificationActions.ADD_NOTIFICATION),
    switchMap((actionData: any) => {
      return this.http.post<any[]>(environment.api + '/timestamp', {
        timestamp: actionData.payload,
      });
    }),
    map((res: any) => {
      return new NotificationActions.NotificationAdded(res.data);
    })
  );
  @Effect()
  removeTimestamp = this.actions$.pipe(
    ofType(NotificationActions.REMOVE_NOTIFICATION),
    switchMap((actionData: any) => {
      return this.http.delete<any[]>(environment.api + `/timestamp/${actionData.payload}`);
    }),
    map((res: any) => {
      return new NotificationActions.NotificationDeleted(res.data);
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
