import { NgModule } from '@angular/core';
import { FavouriteModule } from './favourite/favourite.module';
import { LeaguesModule } from './leagues/leagues.module';

@NgModule({
  imports: [FavouriteModule, LeaguesModule],
})
export class FeaturesModule {}
