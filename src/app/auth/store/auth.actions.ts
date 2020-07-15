import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const SIGNUP = '[Auth] SignUp';
export const LOGOUT = '[Auth] Logout';
export const LOGGEDIN = '[Auth] Loggedin';
export const LOGGEDOUT = '[Auth] LoggedOut';

export class SignUp implements Action {
  readonly type = SIGNUP;

  constructor(public payload: any) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor() {}
}

export class Loggedin implements Action {
  readonly type = LOGGEDIN;

  constructor(public payload: any) {}
}

export class LoggedOut implements Action {
  readonly type = LOGGEDOUT;

  constructor() {}
}
export type AuthActions =
  | Login
  | Loggedin;
