import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as FavouriteActions from '../store/favourite.actions';

import * as fromApp from '../../../core/store/app.reducer';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavouriteLeaguesResolverService implements Resolve<any[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve() {
    this.store.dispatch(new FavouriteActions.GetFavouriteLeagues());
    return this.actions$.pipe(ofType(FavouriteActions.LOAD_MATCHES), take(1));
  }
}
