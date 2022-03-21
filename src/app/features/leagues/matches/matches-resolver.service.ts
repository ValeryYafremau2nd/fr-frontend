import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

import * as fromApp from '../../../core/store/app.reducer'; // fix links between modules
import * as LeaguesActions from '../store/leagues.actions';

@Injectable({ providedIn: 'root' })
export class MatchesResolverService implements Resolve<any[]> {
  constructor(private store: Store<fromApp.AppState>, private actions: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new LeaguesActions.GetAllLeagues());
    return this.actions.pipe(ofType(LeaguesActions.SET_LEAGUES), take(1));
  }
}
