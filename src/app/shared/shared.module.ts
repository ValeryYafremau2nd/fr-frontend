import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TrackComponent } from './components/track/track.component';
import { CommonModule } from '@angular/common';
import { ScrollViewComponent } from './components/scroll-view/scroll-view.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent],
})
export class SharedModule {}
