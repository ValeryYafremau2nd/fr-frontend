import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login, Logout, LoggedOut } from './store/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, Subscription, Subscribable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {
  private modeSub: Subscription;

  isLoginMode = true;
  loginForm: any;
  mode: string;

  constructor(
    // private store: Store<any/*fromApp.AppState*/>,
    // private router: Router,
    private authService: AuthService
    /*private formBuilder: FormBuilder*/
  ) {
    /*this.loginForm = this.formBuilder.group({
      email1: '',
      password1: ''
    });*/
  }

  ngOnInit(): void {
    console.log(this.authService.mode$)
    this.modeSub = this.authService.mode$.subscribe(mode => this.mode = mode);
    this.authService.logout();
    /*this.store
      .select('auth')
      .subscribe((auth: any) => {
        if (auth.token && (Date.now() < auth.exp)) {
          this.router.navigate(['']);
        }
      })*/
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

  onSwitchMode() {}
}
