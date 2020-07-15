import { ActionReducerMap } from '@ngrx/store';

import * as Favourite from '../favourite/store/favourite.reducer';
import * as Leagues from '../leagues/store/leagues.reducer';
import * as Auth from '../auth/store/auth.reducer';

export interface AppState {
  favourite: Favourite.State;
  leagues: any; // Leagues.State;
  auth: any;
}

export const appReducer: ActionReducerMap<AppState> = {
  favourite: Favourite.favouriteReducer,
  leagues: Leagues.leaguesReducer,
  auth: Auth.authReducer
};
