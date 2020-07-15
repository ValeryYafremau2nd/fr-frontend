import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues.component';
import { TeamsComponent } from './teams/teams.component';
import { MatchesComponent } from './matches/matches.component';
import { StandingComponent } from './standing/standing.component';
import { CommonModule } from '@angular/common';
import { StrikersComponent } from './strikers/strikers.component';
import { SquadComponent } from './teams/squad/squad.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguesComponent,
    pathMatch: 'full'
    // canActivate: [AuthGuard],
  },
  {
    path: ':league/matches',
    component: MatchesComponent,
    data: { animation: 'MatchesPage' }
    // resolve: [RecipesResolverService]
  },
  {
    path: ':league/standings',
    component: StandingComponent,
    data: { animation: 'StandingsPage' }
    // resolve: [RecipesResolverService]
  },
  {
    path: ':league/strikers',
    component: StrikersComponent,
    // resolve: [RecipesResolverService]
  },
  {
    path: ':league/teams/:team',
    component: SquadComponent,
    // resolve: [RecipesResolverService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LeaguesRoutingModule { }
