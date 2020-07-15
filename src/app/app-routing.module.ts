import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LeagueResolverService } from './leagues/league-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { FavouriteLeaguesResolverService } from './favourite/favourite-leagues-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/leagues', pathMatch: 'full' },
  {
    path: 'auth/:mode',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // resolve: [LeagueResolverService]
  },
  {
    path: 'favourite',
    canActivate: [AuthGuard],
    loadChildren: () => import('./favourite/favourite.module').then(m => m.FavouriteModule),
    data: { animation: 'FavouritePages' },
    resolve: [/*FavouriteLeaguesResolverService*/]
  },
  {
    path: 'leagues',
    canActivate: [AuthGuard],
    loadChildren: () => import('./leagues/leagues.module').then(m => m.LeaguesModule),
    data: { animation: 'OverviewPages' },
    resolve: [LeagueResolverService]
  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/error', pathMatch: 'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
