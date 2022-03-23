import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent;
  public isAvailable = false;

  constructor(private platform: Platform, private swPush: SwPush, private http: HttpClient) {}
  ngOnInit(): void {
    if (navigator.serviceWorker) {
      this.subscribeToNotifications();
    }
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.googleClientId,
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
}
