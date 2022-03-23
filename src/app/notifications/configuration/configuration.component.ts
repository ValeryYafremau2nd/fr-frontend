import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddNotification, RemoveNotification } from '../store/notification.actions';
import { Subscription } from 'rxjs';
import { AppState } from '../../core/store/app.reducer';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  timestampSub: Subscription;
  timestamps: [];

  constructor(private store: Store<AppState>) {
    this.timestampSub = this.store.select('notifications').subscribe((notifications) => {
      this.timestamps = notifications.notifications;
    });
  }

  onSubmit(timestamp) {
    this.store.dispatch(new AddNotification(timestamp));
  }

  onDelete(timestamp) {
    this.store.dispatch(new RemoveNotification(timestamp));
  }

  updateTimestamp(event, timestamp) {
    event.currentTarget.checked ? this.onSubmit(timestamp) : this.onDelete(timestamp);
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.timestampSub.unsubscribe();
  }
}
