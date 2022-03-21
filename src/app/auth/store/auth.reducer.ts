import * as AuthActions from './auth.actions';

const initState = {
  token: localStorage.getItem('fr_token'),
  exp: 0,
  user: {},
  auth: true,
  error: false,
};

export function authReducer(
  state = initState,
  action: any // FavouriteActions.FavouriteActions
) {
  switch (action.type) {
    case AuthActions.LOGGEDIN:
      return { ...action.payload, auth: true, error: false };
    case AuthActions.ERROR:
      return { ...action.payload, error: action.payload };
    case AuthActions.LOGGEDOUT:
      localStorage.removeItem('fr_token');
      return { ...initState, auth: false };
    default:
      return state;
  }
}
