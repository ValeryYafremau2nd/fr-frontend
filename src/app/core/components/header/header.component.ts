import { Component, OnInit, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { NavStateService, Mode } from '../../services/nav-state.service';
import { Store } from '@ngrx/store';
import { Logout } from '../../../auth/store/auth.actions';
import { PwaService } from '../../../notifications/services/pwa.service';
import { AppState } from '../../store/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit {
  isVisible: boolean = false;
  isFavourite: boolean = false;
  urlRoot: string = '/favourite';
  tab: string = 'matches';
  isLoggedIn: boolean = false; // fix public
  showSubmenu = false;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private router: Router,
    private navStateService: NavStateService,
    public pwaService: PwaService
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth: any) => {
        this.isLoggedIn = auth.auth;
      });
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const navState = this.navStateService.getCurrentState();
        this.isVisible = this.isLoggedIn && (navState.mode === Mode.Favourite || !!navState.league);
        this.isFavourite = navState.mode === Mode.Favourite;
        this.urlRoot = navState.mode + '/' + (navState.league || '');
        this.tab = navState.tab;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  logOut() {
    this.store.dispatch(new Logout());
  }

  goBack() {
    this.location.back();
  }

  refresh() {
    let currentUrl = this.router.url; // fix undescore for private
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  goForward() {
    this.location.forward();
  }
}
