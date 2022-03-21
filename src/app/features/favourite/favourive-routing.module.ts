import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from '../leagues/teams/teams.component';
import { MatchesComponent } from '../leagues/matches/matches.component';
import { FavouriteLeaguesResolverService } from './services/favourite-leagues-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/favourite/matches',
    pathMatch: 'full',
  },
  {
    path: 'teams',
    component: TeamsComponent,
    data: { animation: 'FavouriteTeamsPage' },
  },
  {
    path: 'matches',
    component: MatchesComponent,
    data: { animation: 'FavouriteMatchesPage' },
  },
  {
    path: 'leagues',
    resolve: [FavouriteLeaguesResolverService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteRoutingModule {}
