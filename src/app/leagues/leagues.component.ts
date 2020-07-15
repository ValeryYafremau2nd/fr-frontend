import { Component, OnInit, OnDestroy } from '@angular/core';
import { League } from './league.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavStateService, Mode } from '../nav-state.service';
import { AddLeague, RemoveLeague, GetFavouriteLeagues } from '../favourite/store/favourite.actions';
import { GetAllLeagues } from './store/leagues.actions';
// import * as bootbox from 'bootbox';
// let bootbox;

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit, OnDestroy {
  leagues: any[] = [];
  storeSub: Subscription;

  constructor(
    private store: Store<any/*fromApp.AppState*/>,
    private navStateService: NavStateService
  ) {
  }

  ngOnInit(): void {
    const navState = this.navStateService.getCurrentState();

    if (navState.mode === Mode.Leagues) {
      this.storeSub = this.store
        .subscribe(state => {
          const trackedLeagues = state.favourite.leagues.map(league => league.id);
          this.leagues = state.leagues.leagues
            .map(league => ({ ...league, tracked: trackedLeagues.includes(league.id)}));
        });
    } else {
      this.storeSub = this.store
        .select('favourite')
        .subscribe(favourite => {
          this.leagues = favourite.leagues.map(league => ({ ...league, tracked: true }));
        });
    }
  }

  track($event, league: any) {
    this.store.dispatch(new AddLeague({ id: league.id, logo: league.logo, title: league.title }));
  }

  untrack($event, league: any) {
    /*bootbox.confirm('Do you realy want to untrack this?', (isConfirmed) => {
      if (isConfirmed) {
        this.store.dispatch(new RemoveLeague(league.id));
      }
    });*/
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
