import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaguesRoutingModule } from './leagues-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { CommonModule } from '@angular/common';
import { LeaguesComponent } from './leagues.component';
import { StandingComponent } from './standing/standing.component';
import { MatchesComponent } from './matches/matches.component';
import { SquadComponent } from './teams/squad/squad.component';
import { StrikersComponent } from './strikers/strikers.component';
import { TrackComponent } from '../shared/track/track.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FilterComponent } from './matches/filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TeamsComponent,
    LeaguesComponent,
    StandingComponent,
    MatchesComponent,
    SquadComponent,
    StrikersComponent,
    TrackComponent,
    LoadingSpinnerComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LeaguesRoutingModule,
    RouterModule
  ]
})
export class LeaguesModule { }
