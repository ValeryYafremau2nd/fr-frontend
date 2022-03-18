import { NgModule } from "@angular/core";
import { ErrorComponent } from "../core/components/error/error.component";
import { ConfigurationComponent } from "../notifications/configuration/configuration.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { TrackComponent } from "./components/track/track.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [LoadingSpinnerComponent, TrackComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, TrackComponent],
})
export class SharedModule {}
