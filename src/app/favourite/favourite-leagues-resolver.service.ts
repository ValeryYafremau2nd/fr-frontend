import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as FavouriteActions from './store/favourite.actions';

import * as fromApp from '../store/app.reducer';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FavouriteLeaguesResolverService implements Resolve<any[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
    /*return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
        return recipesState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );*/
    this.store.dispatch(new FavouriteActions.GetFavouriteLeagues());
    return this.actions$.pipe(
      ofType(FavouriteActions.LOAD_MATCHES),
      take(1)
    );
  }
}