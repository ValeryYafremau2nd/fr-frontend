import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const enum Mode {
    Leagues = 'leagues',
    Favourite = 'favourite'
}

export const enum Tab {
    Leagues = 'leagues',
    Matches = 'matches',
    Teams = 'teams',
    Strikers = 'strikers',
    Standings = 'standings'
}

@Injectable({ providedIn: 'root' })
export class NavStateService {
    constructor(
        private router: Router
    ) {}

    getCurrentState() {
        const uri = this.router.routerState.snapshot.url.split('/');
        const isFavourite = Mode.Leagues !== uri[1];
        return {
            mode: uri[1],
            league: !isFavourite ? uri[2] : undefined,
            tab: isFavourite ? uri[2] : uri[3]
        };
    }
}