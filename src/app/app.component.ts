import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './shared/animations/app.animations'; // to core
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = 'football-reminder';

  constructor(private swPush: SwPush, private http: HttpClient) {}
  ngOnInit(): void {
    if (navigator.serviceWorker) {
      this.subscribeToNotifications();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.googleClientId,
      })
      .then((sub) => {
        this.http.post<any[]>(environment.api + '/subscribe', JSON.stringify(sub)).subscribe((test) => {
          /*console.log('test')*/
        });
      })
      .catch((err) => console.error('Could not subscribe to notifications', err));
  }

  unsubscribeFromNotification(callback: ()=>void) {
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
      for(let registration of registrations) {
        registration.unregister();
        callback()
      }
    });
  }
}
