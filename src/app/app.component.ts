import { Component, OnInit } from "@angular/core";
import { slideInAnimation } from "./shared/animations/app.animations"; // to core
import { RouterOutlet } from "@angular/router";
import { SwPush } from "@angular/service-worker";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = "football-reminder";

  constructor(
    private swPush: SwPush,
    private http: HttpClient // private newsletterService: NewsletterService
  ) {}
  ngOnInit(): void {
    console.log(1);
    if ("serviceWorker" in navigator) {
      console.log(2);
      this.subscribeToNotifications();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey:
          "BCp1KVN_hl1WZaolVgEjEP_3dZWa3VmQVdswYq8vRT5eGnERgnJngwZEc-jR5SqqekpzHeFkCYkcaiHbTXpkr_Q",
      })
      .then((sub) => {
        console.log(123);
        this.http
          .post<any[]>(environment.api + "/subscribe", JSON.stringify(sub))
          .subscribe((test) => console.log(test));
      })
      .catch((err) =>
        console.error("Could not subscribe to notifications", err)
      );
  }
}
