import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as NotificationActions from './store/notification.actions';

import * as fromApp from '../core/store/app.reducer';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationResolverService implements Resolve<any[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new NotificationActions.LoadNotifications());
    return this.actions$.pipe(ofType(NotificationActions.NOTIFICATIONS_LOADED), take(1));
  }
}
