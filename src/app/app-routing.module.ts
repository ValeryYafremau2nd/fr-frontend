import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './core/components/error/error.component';
import { AuthGuard } from './auth/guardians/auth.guard';
import { ConfigurationComponent } from './notifications/configuration/configuration.component';
import { NotificationResolverService } from './notifications/notification-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/leagues', pathMatch: 'full' },
  {
    path: 'auth/:mode',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'favourite',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/favourite/favourite.module').then((m) => m.FavouriteModule),
    data: { animation: 'FavouritePages' },
    resolve: [
    ],
  },
  {
    path: 'leagues',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/leagues/leagues.module').then((m) => m.LeaguesModule),
    data: { animation: 'OverviewPages' },
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: ConfigurationComponent,
    resolve: [NotificationResolverService],
  },
  { path: 'error', component: ErrorComponent },
  { path: '', redirectTo: '/error', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
