import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../core/store/app.reducer';
import ICompetition from '../../models/competition/competition-interface';
import { NavStateService, Mode } from '../../core/services/nav-state.service';
import { AddLeague } from '../favourite/store/favourite.actions';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  leagues: ICompetition[] = [];
  storeSub: Subscription;
  isLoading = true;

  constructor(private store: Store<AppState>, private navStateService: NavStateService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const navState = this.navStateService.getCurrentState();

    if (navState.mode === Mode.Leagues) {
      this.storeSub = this.store.pipe(take(1)).subscribe((state) => {
        this.isLoading = false;
        const trackedLeagues = state.favourite.leagues.map((league) => league.code);
        this.leagues = state.leagues.leagues.map((league) => ({
          ...league,
          tracked: trackedLeagues.includes(league.code),
        }));
      });
    } else {
      this.storeSub = this.store
        .select('favourite')
        .pipe(take(1))
        .subscribe((favourite) => {
          this.leagues = favourite.leagues.map((league) => ({
            ...league,
            tracked: true,
          }));
        });
    }
  }

  track($event, league: ICompetition) {
    this.store.dispatch(new AddLeague(league.code));
  }

  untrack($event, league: ICompetition) {}
}
