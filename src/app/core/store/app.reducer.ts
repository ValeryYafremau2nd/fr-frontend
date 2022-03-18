import { ActionReducerMap } from "@ngrx/store";

import * as Favourite from "../../features/favourite/store/favourite.reducer";
import * as Leagues from "../../features/leagues/store/leagues.reducer";
import * as Auth from "../../auth/store/auth.reducer";
import * as Notifications from "../../notifications/store/notification.reducer";

export interface AppState {
  favourite: Favourite.State;
  leagues: any; // Leagues.State;
  auth: any;
  notifications: any;
}

export const appReducer: ActionReducerMap<AppState> = {
  favourite: Favourite.favouriteReducer,
  leagues: Leagues.leaguesReducer,
  auth: Auth.authReducer,
  notifications: Notifications.notificationReducer,
};
