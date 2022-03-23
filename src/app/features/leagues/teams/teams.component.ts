import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { GetFavouriteTeams, AddTeam, RemoveTeam } from '../../../features/favourite/store/favourite.actions';
import { Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { AppState } from '../../../core/store/app.reducer';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  teams;
  isLoading = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.teams = undefined;
    this.store
      .select('favourite')
      .pipe(skip(1))
      .subscribe((favourite) => {
        // fix
        this.teams = favourite.teams;
        if (this.teams !== undefined) {
          this.isLoading = false;
        }
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
