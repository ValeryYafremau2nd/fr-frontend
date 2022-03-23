import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as NotificationActions from './notification.actions';
import { environment } from '../../../environments/environment';
import Response from '../../models/response.model';

// STALE
@Injectable()
export class NotificationEffects {
  @Effect()
  fetchTimestamps = this.actions$.pipe(
    ofType(NotificationActions.LOAD_NOTIFICATIONS),
    switchMap(() => {
      return this.http.get(environment.api + '/timestamps');
    }),
    map((res: Response) => {
      return new NotificationActions.NotificationLoaded(res.data);
    })
  );
  @Effect()
  addTimestamp = this.actions$.pipe(
    ofType(NotificationActions.ADD_NOTIFICATION),
    switchMap((actionData: any) => {
      return this.http.post(environment.api + '/timestamp', {
        timestamp: actionData.payload,
      });
    }),
    map((res: Response) => {
      return new NotificationActions.NotificationAdded(res.data);
    })
  );
  @Effect()
  removeTimestamp = this.actions$.pipe(
    ofType(NotificationActions.REMOVE_NOTIFICATION),
    switchMap((actionData: any) => {
      return this.http.delete(environment.api + `/timestamp/${actionData.payload}`);
    }),
    map((res: Response) => {
      return new NotificationActions.NotificationDeleted(res.data);
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
