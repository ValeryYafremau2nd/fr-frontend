import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, Subscribable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { FormGroup } from '@angular/forms';
import IAuth from '../../../models/auth.model';
import { AppState } from '../../../core/store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService],
})
export class AuthComponent implements OnInit, OnDestroy {
  private modeSub: Subscription;
  private userSub: Subscription;
  isLoginMode = true;
  mode: string;
  error = ' ';
  socialUser!: SocialUser;
  isLoggedin: boolean;

  constructor(
    private store: Store<AppState>,
    private socialAuthService: SocialAuthService,
    private authService: AuthService /*private formBuilder: FormBuilder*/
  ) {}

  ngOnInit(): void {
    this.modeSub = this.authService.mode$.subscribe((mode) => (this.mode = mode));
    this.authService.logout();
    this.store.select('auth').subscribe((auth: IAuth) => {
      this.error = auth.error;
    });

    this.userSub = this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  login(authForm: FormGroup) {
    this.authService.login(authForm.controls.email.value, authForm.controls.password.value);
  }

  signup(authForm: FormGroup) {
    const controls = authForm.controls;
    if (controls.confirmPassword.value !== controls.password.value) {
      this.error = 'Password confirmed incorrectly.';
    } else {
      this.authService.signup(authForm.controls.email.value, authForm.controls.password.value);
    }
  }
  async loginWithGoogle() {
    const oauthRes = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.loginOauth(oauthRes.id, oauthRes.response.id_token);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  onSwitchMode() {}
}
