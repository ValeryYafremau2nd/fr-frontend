import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { GetFavouriteTeams, AddTeam, RemoveTeam } from 'src/app/favourite/store/favourite.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: any;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store
      .select('favourite')
      .subscribe(favourite => {
        this.teams = favourite.teams;
      });
    this.store.dispatch(new GetFavouriteTeams());
  }

  trackTeam(id) {
    this.store.dispatch(new AddTeam(id));
  }

  untrackTeam(id) {
    this.store.dispatch(new RemoveTeam(id));
  }

}
