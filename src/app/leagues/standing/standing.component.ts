import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { NavStateService, Mode } from 'src/app/nav-state.service';
import { Store } from '@ngrx/store';
import { GetStandings } from '../store/leagues.actions';
import { AddTeam, RemoveTeam } from 'src/app/favourite/store/favourite.actions';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  public standings: Team[] = [];
  storeSub: any;

  constructor(
    private store: Store<any/*fromApp.AppState*/>,
    private navStateService: NavStateService
  ) {
    const navState = this.navStateService.getCurrentState();
    store.dispatch(new GetStandings(navState.league));
  }

  ngOnInit(): void {
    this.storeSub = this.store
      .select('leagues')
      .subscribe(leagues => {
        const navState = this.navStateService.getCurrentState();
        const leagueId = navState.league;
        const selectedLeague = leagues.leagues.find(league => league.id === +leagueId);
        this.standings = selectedLeague ? selectedLeague.standings : [];
      });
  }

  trackTeam(id) {
    this.store.dispatch(new AddTeam(id));
  }

  untrackTeam(id) {
    this.store.dispatch(new RemoveTeam(id));
  }
}
