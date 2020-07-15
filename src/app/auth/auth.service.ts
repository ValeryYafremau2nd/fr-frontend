import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggedOut, Login, SignUp } from './store/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private modeSub: Subscription;

    mode$ = new BehaviorSubject(this.route.snapshot.params.mode);

    constructor(
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.modeSub = this.route.params.subscribe((params) => this.mode$.next(params.mode));
    }
    ngOnDestroy(): void {
        this.modeSub.unsubscribe();
    }

    login(email, password) {
        this.store.dispatch(new Login({ email, password }));
     }

    logout() {
        this.store.dispatch(new LoggedOut());
    }

    signup(email, password) {
        this.store.dispatch(new SignUp({ email, password }));
    }
}
