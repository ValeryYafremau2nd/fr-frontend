import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from '../leagues/leagues.component';
import { TeamsComponent } from '../leagues/teams/teams.component';
import { MatchesComponent } from '../leagues/matches/matches.component';
import { FavouriteLeaguesResolverService } from './favourite-leagues-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/favourite/matches',
    pathMatch: 'full'
    // canActivate: [AuthGuard],
  },
      {
        path: 'teams',
        component: TeamsComponent,
        data: { animation: 'FavouriteTeamsPage' }
        // resolve: [RecipesResolverService]
      },
      {
        path: 'matches',
        component: MatchesComponent,
        data: { animation: 'FavouriteMatchesPage' }
        // resolve: [RecipesResolverService]
      },
      {
        path: 'leagues',
        resolve: [FavouriteLeaguesResolverService]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteRoutingModule { }
