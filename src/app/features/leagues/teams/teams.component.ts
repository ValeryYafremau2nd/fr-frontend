import { Component, OnInit } from "@angular/core";
import { Team } from "./team.model";
import {
  GetFavouriteTeams,
  AddTeam,
  RemoveTeam,
} from "src/app/features/favourite/store/favourite.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.css"],
})
export class TeamsComponent implements OnInit {
  teams: any;
  isLoading = true;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.store.select("favourite").subscribe((favourite) => {
      // fix
      this.teams = favourite.teams;
      console.log(favourite.teams);
      if (this.teams !== undefined && this.teams.length) {
        this.isLoading = false;
      }
    });
    this.store.dispatch(new GetFavouriteTeams());
  }

  trackTeam(id) {
    this.store.dispatch(new AddTeam(id));
  }

  untrackTeam(id) {
    this.store.dispatch(new RemoveTeam(id));
  }
}
