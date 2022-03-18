import { NgModule } from "@angular/core";
import { ErrorComponent } from "./components/error/error.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavStateService } from "./services/nav-state.service";
import { HeaderComponent } from "./components/header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FavouriteEffects } from "../features/favourite/store/favourite.effects";
import { LeagueEffects } from "../features/leagues/store/leagues.effects";
import { AuthEffects } from "../auth/store/auth.effects";
import { NotificationEffects } from "../notifications/store/notification.effects";
import * as fromApp from "./store/app.reducer";

@NgModule({
  declarations: [
    // ErrorComponent
  ],
  imports: [],
  exports: [
    // ErrorComponent
  ],
  providers: [
    // NavStateService
  ],
})
export class CoreModule {}
