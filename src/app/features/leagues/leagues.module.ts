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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module';

@NgModule({
  declarations: [
    TeamsComponent,
    LeaguesComponent,
    StandingComponent,
    MatchesComponent,
    SquadComponent,
    StrikersComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LeaguesRoutingModule, RouterModule, SharedModule],
})
export class LeaguesModule {}
