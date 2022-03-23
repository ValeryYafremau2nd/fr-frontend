import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TrackComponent } from './components/track/track.component';
import { CommonModule } from '@angular/common';
import { ScrollViewComponent } from './components/scroll-view/scroll-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent],
  imports: [MatIconModule,CommonModule],
  exports: [LoadingSpinnerComponent, TrackComponent, ScrollViewComponent],
})
export class SharedModule {}
