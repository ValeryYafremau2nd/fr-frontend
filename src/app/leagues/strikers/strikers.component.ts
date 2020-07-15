import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavStateService } from 'src/app/nav-state.service';

@Component({
  selector: 'app-strikers',
  templateUrl: './strikers.component.html',
  styleUrls: ['./strikers.component.css']
})
export class StrikersComponent implements OnInit {

  strikers = [];

  constructor(
    private store: Store<any/*fromApp.AppState*/>,
    private navStateService: NavStateService
  ) { }

  ngOnInit(): void {
    this.store
      .select('leagues')
      .subscribe(leagues => {
        const navState = this.navStateService.getCurrentState();
        const league = navState.league;
        this.strikers = leagues.leagues[league] ? leagues.leagues[league].strikers : [];
      });
  }

}
