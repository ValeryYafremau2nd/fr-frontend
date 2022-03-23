import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { NavStateService, Mode } from '../../../core/services/nav-state.service';
import { Store } from '@ngrx/store';
import { GetStandings } from '../store/leagues.actions';
import { AddTeam, RemoveTeam } from '../../../features/favourite/store/favourite.actions';
import { AppState } from '../../../core/store/app.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css'],
})
export class StandingComponent implements OnInit {
  public standings: Team[] = [];
  storeSub;
  isLoading = true;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private navStateService: NavStateService) {
    const navState = this.navStateService.getCurrentState();
    store.dispatch(new GetStandings(navState.league));
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.storeSub = this.store
      .select('leagues')
      .pipe(takeUntil(this.destroy$))
      .subscribe((leagues) => {
        // fix unsub
        const navState = this.navStateService.getCurrentState();
        const code = navState.league;
        const selectedLeague = leagues.leagues.find((league) => league.code === code);
        this.standings = selectedLeague ? selectedLeague.standings : [];
        if (this.standings !== undefined) {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  trackTeam(id) {
    this.store.dispatch(new AddTeam(id));
  }

  untrackTeam(id) {
    this.store.dispatch(new RemoveTeam(id));
  }
}
