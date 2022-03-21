import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavouriteRoutingModule } from './favourive-routing.module';
import { SharedModule } from '../../../app/shared/shared.module';

@NgModule({
  imports: [RouterModule, FavouriteRoutingModule, SharedModule], // fix remove shared
})
export class FavouriteModule {}
