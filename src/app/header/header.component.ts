import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import { NavStateService, Mode } from '../nav-state.service';
import { Store } from '@ngrx/store';
import { Logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit {

  isVisible: boolean = false;
  isFavourite: boolean = false;
  urlRoot: string = '/favourite';
  tab: string = 'matches';
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<any>,
    private router: Router,
    private navStateService: NavStateService
  ) {
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth: any) => {
      this.isLoggedIn = !!localStorage.getItem('fr_token');
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const navState = this.navStateService.getCurrentState();
        this.isVisible = navState.mode === Mode.Favourite || !!navState.league;
        this.isFavourite = navState.mode === Mode.Favourite;
        this.urlRoot = navState.mode + '/' + (navState.league || '');
        this.tab = navState.tab;
      }
    });
  }

  logOut() {
    this.store.dispatch(new Logout());
  }

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }

}
