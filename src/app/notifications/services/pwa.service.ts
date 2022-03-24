import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AppState } from '../../core/store/app.reducer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent;
  public isAvailable = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private platform: Platform,
    private swPush: SwPush,
    private http: HttpClient
  ) {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authInfo: any) => {
        if (authInfo.auth) {
          this.subscribeToNotifications();
        }
      });
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.notificationPubKey,
      })
      .then((sub) => {
        this.http
          .post(environment.api + '/subscribe', JSON.stringify(sub))
          .pipe(take(1))
          .subscribe(() => {
            /*console.log('test')*/
          });
      })
      .catch((err) => console.error('Could not subscribe to notifications', err));
  }

  unsubscribeFromNotification(callback: () => void) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
        callback();
      }
    });
  }

  public initPwaPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.promptEvent = event;
      this.isAvailable = (this.platform.ANDROID || this.platform.IOS) && !!localStorage.getItem('fr_token');
    });
  }

  public installPwa() {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then(() => {
      this.promptEvent = null;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
