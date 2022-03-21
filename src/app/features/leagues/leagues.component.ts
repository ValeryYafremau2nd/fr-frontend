import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavStateService, Mode } from '../../core/services/nav-state.service';
import { AddLeague } from '../favourite/store/favourite.actions';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit, OnDestroy {
  leagues: any[] = [];
  storeSub: Subscription;
  isLoading = true;

  constructor(private store: Store<any /*fromApp.AppState*/>, private navStateService: NavStateService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const navState = this.navStateService.getCurrentState();

    if (navState.mode === Mode.Leagues) {
      this.storeSub = this.store.subscribe((state) => {
        // fix unsub
        this.isLoading = false;
        const trackedLeagues = state.favourite.leagues.map((league) => league.id);
        this.leagues = state.leagues.leagues.map((league) => ({
          ...league,
          tracked: trackedLeagues.includes(league.id),
        }));
      });
    } else {
      this.storeSub = this.store.select('favourite').subscribe((favourite) => {
        this.leagues = favourite.leagues.map((league) => ({
          ...league,
          tracked: true,
        }));
      });
    }
  }

  track($event, league: any) {
    this.store.dispatch(new AddLeague({ id: league.id, logo: league.logo, title: league.title }));
  }

  untrack($event, league: any) {
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
