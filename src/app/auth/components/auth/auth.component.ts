import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Login, Logout, LoggedOut } from "../../store/auth.actions";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable, Subscription, Subscribable } from "rxjs";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
  providers: [AuthService],
})
export class AuthComponent implements OnInit, OnDestroy {
  private modeSub: Subscription;

  isLoginMode = true;
  loginForm: any;
  mode: string;
  error = "";
  socialUser!: SocialUser;
  isLoggedin: boolean;

  constructor(
    private store: Store<any /*fromApp.AppState*/>,
    private socialAuthService: SocialAuthService,
    // private router: Router,
    private authService: AuthService /*private formBuilder: FormBuilder*/
  ) {
    /*this.loginForm = this.formBuilder.group({
      email1: '',
      password1: ''
    });*/
  }

  ngOnInit(): void {
    this.modeSub = this.authService.mode$.subscribe(
      (mode) => (this.mode = mode)
    );
    this.authService.logout();
    this.store.select("auth").subscribe((auth: any) => {
      this.error = auth.error;
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }

  login(authForm: any) {
    this.authService.login(
      authForm.form.controls.email.value,
      authForm.form.controls.password.value
    );
  }

  signup(authForm: any) {
    this.authService.signup(
      authForm.form.controls.email.value,
      authForm.form.controls.password.value
    );
  }
  async loginWithGoogle(): Promise<void> {
    const oauthRes = await this.socialAuthService.signIn(
      GoogleLoginProvider.PROVIDER_ID
    );
    this.authService.loginOauth(oauthRes.id, oauthRes.response.id_token);
  }

  // Logout the current session
  logOut(): void {
    this.socialAuthService.signOut();
  }

  onSwitchMode() {}
}
