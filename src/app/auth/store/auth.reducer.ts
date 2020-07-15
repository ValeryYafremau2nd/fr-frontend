// import { Recipe } from '../recipe.model';
import * as AuthActions from './auth.actions';

const initState = {
  token: localStorage.getItem('fr_token'),
  exp: 0,
  user: {}
}

export function authReducer(
  state = initState,
  action: any// FavouriteActions.FavouriteActions
) {
  switch (action.type) {
    case AuthActions.LOGGEDIN:
      return { ...action.payload };
      case AuthActions.LOGGEDOUT:
        localStorage.removeItem('fr_token');
        return initState;
    default:
      return state;
  }
}
