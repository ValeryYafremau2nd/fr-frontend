import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggedOut, Login, LoginOauth, SignUp } from '../store/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private modeSub: Subscription;

  mode$ = new BehaviorSubject(this.route.snapshot.params.mode);

  constructor(private route: ActivatedRoute, private store: Store<any>) {
    this.modeSub = this.route.params.subscribe((params) => this.mode$.next(params.mode));
  }
  ngOnDestroy(): void {
    this.modeSub.unsubscribe();
  }

  login(email, password) {
    this.store.dispatch(new Login({ email, password }));
  }

  loginOauth(user, token) {
    this.store.dispatch(new LoginOauth({ user, token }));
  }

  logout() {
    this.store.dispatch(new LoggedOut());
  }

  signup(email, password) {
    this.store.dispatch(new SignUp({ email, password }));
  }
}
