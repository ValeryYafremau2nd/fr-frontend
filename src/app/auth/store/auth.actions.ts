import { Action } from '@ngrx/store';
import IAuth from '../../models/auth.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_OAUTH = '[Auth] Login Oauth';
export const SIGNUP = '[Auth] SignUp';
export const LOGOUT = '[Auth] Logout';
export const LOGGEDIN = '[Auth] Loggedin';
export const LOGGEDOUT = '[Auth] LoggedOut';
export const ERROR = '[Auth] Error';

export class Error implements Action {
  readonly type = ERROR;

  constructor(public payload: string) {}
}

export class SignUp implements Action {
  readonly type = SIGNUP;

  constructor(public payload: { email: string; password: string }) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginOauth implements Action {
  readonly type = LOGIN_OAUTH;

  constructor(public payload: { token: string; usr: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Loggedin implements Action {
  readonly type = LOGGEDIN;

  constructor(public payload: IAuth) {}
}

export class LoggedOut implements Action {
  readonly type = LOGGEDOUT;
}
export type AuthActions = Login | Loggedin;
