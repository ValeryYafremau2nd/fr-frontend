import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TrackComponent } from './components/track/track.component';
import { CommonModule } from '@angular/common';
import { ScrollViewComponent } from './components/scroll-view/scroll-view.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { FilterService } from './components/filter/filter.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent, FilterComponent],
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, FormsModule, MatSlideToggleModule],
  exports: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent, FilterComponent],
  providers: [FilterService],
})
export class SharedModule {}
