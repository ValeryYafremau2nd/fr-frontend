import * as NotificationActions from './notification.actions';

export interface State {
  notifications: Set<any>;
}

const initialState: State = {
  notifications: new Set(),
};

export function notificationReducer(state = initialState, action: any) {
  switch (action.type) {
    case NotificationActions.NOTIFICATIONS_LOADED: {
      return {
        notifications: new Set(action.payload),
      };
    }
    case NotificationActions.NOTIFICATION_ADDED: {
      state.notifications.add(action.payload);
      return {
        notifications: new Set(state.notifications),
      };
    }
    case NotificationActions.NOTIFICATION_DELETED: {
      state.notifications.delete(action.payload);
      return {
        notifications: new Set(state.notifications),
      };
    }
    default:
      return state;
  }
}
