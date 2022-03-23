import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './shared/animations/app.animations'; // to core
import { RouterOutlet } from '@angular/router';
import { PwaService } from './notifications/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'football-reminder';

  constructor(private _pwaService: PwaService) {    
    if (navigator.serviceWorker) {
      this._pwaService.subscribeToNotifications();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
