import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, Subscribable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService],
})
export class AuthComponent implements OnInit, OnDestroy {
  private modeSub: Subscription;

  isLoginMode = true;
  loginForm: any;
  mode: string;
  error = '';
  socialUser!: SocialUser;
  isLoggedin: boolean;

  constructor(
    private store: Store<any /*fromApp.AppState*/>,
    private socialAuthService: SocialAuthService,
    private authService: AuthService /*private formBuilder: FormBuilder*/
  ) {}

  ngOnInit(): void {
    this.modeSub = this.authService.mode$.subscribe((mode) => (this.mode = mode));
    this.authService.logout();
    this.store.select('auth').subscribe((auth: any) => {
      this.error = auth.error;
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
  }

  login(authForm: any) {
    this.authService.login(authForm.form.controls.email.value, authForm.form.controls.password.value);
  }

  signup(authForm: any) {
    const controls = authForm.form.controls;
    if (controls.confirmPassword.value !== controls.password.value) {
      this.error = 'Password confirmed incorrectly.';
    } else {
      this.authService.signup(authForm.form.controls.email.value, authForm.form.controls.password.value);
    }
  }
  async loginWithGoogle(): Promise<void> {
    const oauthRes = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.loginOauth(oauthRes.id, oauthRes.response.id_token);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  onSwitchMode() {}
}
