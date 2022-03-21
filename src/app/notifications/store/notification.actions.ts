import { Action } from '@ngrx/store';

export const LOAD_NOTIFICATIONS = '[Notifications] Load notifications';
export const ADD_NOTIFICATION = '[Notifications] Add notification';
export const REMOVE_NOTIFICATION = '[Notifications] Remove notification';
export const NOTIFICATIONS_LOADED = '[Notifications] lodaded';
export const NOTIFICATION_DELETED = '[Notifications] deleted';
export const NOTIFICATION_ADDED = '[Notifications] added';

export class LoadNotifications implements Action {
  readonly type = LOAD_NOTIFICATIONS;

  constructor() {}
}

export class AddNotification implements Action {
  readonly type = ADD_NOTIFICATION;

  constructor(public payload: any) {}
}

export class RemoveNotification implements Action {
  readonly type = REMOVE_NOTIFICATION;

  constructor(public payload: any) {}
}

export class NotificationLoaded implements Action {
  readonly type = NOTIFICATIONS_LOADED;

  constructor(public payload: any) {}
}

export class NotificationAdded implements Action {
  readonly type = NOTIFICATION_ADDED;

  constructor(public payload: any) {}
}

export class NotificationDeleted implements Action {
  readonly type = NOTIFICATION_DELETED;

  constructor(public payload: any) {}
}
