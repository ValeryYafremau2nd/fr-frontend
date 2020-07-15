import {BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterService {
    showFinishedSubject = new BehaviorSubject(localStorage.getItem('showFinished') === 'true' ? true : false);
    showTrackedTeamsSubject = new BehaviorSubject(localStorage.getItem('showTrackedTeams') === 'true' ? true : false);

    applyShowFinishedFilter(value) {
        localStorage.setItem('showFinished', value);
        this.showFinishedSubject.next(value);
     }

     applyShowTrackedTeamsFilter(value) {
         localStorage.setItem('showTrackedTeams', value);
         this.showTrackedTeamsSubject.next(value);
      }
}
