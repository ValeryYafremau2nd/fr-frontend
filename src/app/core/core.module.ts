import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { NavStateService } from './services/nav-state.service';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from '../shared/components/filter/filter.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ErrorComponent, HeaderComponent],
  imports: [BrowserModule, RouterModule, CommonModule, FormsModule, MatIconModule, MatButtonModule],
  exports: [ErrorComponent, HeaderComponent],
  providers: [NavStateService],
})
export class CoreModule {}
