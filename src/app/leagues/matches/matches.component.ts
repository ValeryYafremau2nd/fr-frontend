import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { MatchDay } from './match.model';
import { Store } from '@ngrx/store';
import { NavStateService, Mode } from 'src/app/nav-state.service';
import { Subscribable, Subscription } from 'rxjs';
import { GetMatches } from '../store/leagues.actions';
import { GetFavouriteMathes, AddTeam, AddMatch, RemoveMatch } from '../../favourite/store/favourite.actions';
import { FilterService } from './filter/filter.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
@Injectable({providedIn: 'root'})
export class MatchesComponent implements OnInit, OnDestroy {
  matchDays: MatchDay[] = [];
  private storeSub: Subscription;
  isLoading = true;
  showFinishedSubject: boolean;
  showTrackedTeamsSubject: boolean;
  notFilteredMatches: any;

  constructor(
    private store: Store<any/*fromApp.AppState*/>,
    private navStateService: NavStateService,
    private filterService: FilterService
  ) {
    const navState = this.navStateService.getCurrentState();
    if (navState.mode === 'leagues') {
      store.dispatch(new GetMatches(navState.league));
      return;
    }
    store.dispatch(new GetFavouriteMathes());
  }

  trackMatch(id) {
    this.store.dispatch(new AddMatch(id));
  }

  untrackMatch(id) {
    this.store.dispatch(new RemoveMatch(id));
  }

  ngOnInit(): void {
    this.filterService.showFinishedSubject.subscribe((val) => {
      this.showFinishedSubject = val;
      this.matchDays = this.applyFilters();
    });
    this.filterService.showTrackedTeamsSubject.subscribe((val) => {
      this.showTrackedTeamsSubject = val;
      this.matchDays = this.applyFilters();
    });


    const navState = this.navStateService.getCurrentState();
    this.isLoading = true;

    if (navState.mode === Mode.Leagues) {
      this.storeSub = this.store
        .select('leagues')
        .subscribe(leagues => {
          const navState = this.navStateService.getCurrentState();
          const leagueId = navState.league;
          const selectedLeague = leagues.leagues.find(league => league.id === +leagueId);
          this.notFilteredMatches = selectedLeague ? selectedLeague.matches : [];
          this.matchDays = this.applyFilters();
          if (this.matchDays !== undefined) {
            this.isLoading = false;
          }
        });
    } else {
      this.storeSub = this.store
        .select('favourite')
        .subscribe(favourite => {
          this.notFilteredMatches = favourite.matches;
          this.matchDays = this.applyFilters();
          if (this.matchDays !== undefined) {
            this.isLoading = false;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  private applyFilters() {
    if (!this.notFilteredMatches) {
      return;
    }
    const filteredMatchDays = this.notFilteredMatches.map(matchDay => {
      const copy = {...matchDay};
      copy.matches = copy.matches.filter(match => {
          const isFinished = match.status === 'FINISHED';
          const trackedTeam = match.homeTeam.tracked || match.awayTeam.tracked;
          const filteredByTeam = this.showTrackedTeamsSubject ? true : match.tracked || !trackedTeam;
          const filteredByStatus = this.showFinishedSubject ? true : !isFinished;
          return filteredByTeam && filteredByStatus;
      });
      return copy;
    });
    const cleanedEmptyDays = filteredMatchDays.filter(matchDay => matchDay.matches.length);
    return cleanedEmptyDays;
  }
}
