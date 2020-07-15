import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';
import { NavStateService } from 'src/app/nav-state.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  showCheckedTeamsCheckboxValue: boolean;
  showFinishedCheckboxValue: boolean;
  isFavourite = false;

  constructor(
    private filterService: FilterService,
    private navState: NavStateService) { }

  ngOnInit(): void {
    this.isFavourite = this.navState.getCurrentState().mode === 'favourite';

    const showCheckedTeams = localStorage.getItem('showTrackedTeams');
    if (!showCheckedTeams) {
      this.filterService.applyShowTrackedTeamsFilter(true);
    }
    const showFinished = localStorage.getItem('showFinished');
    if (!showFinished) {
      this.filterService.applyShowFinishedFilter(true);
    }
    this.showCheckedTeamsCheckboxValue = localStorage.getItem('showTrackedTeams') === 'true' ? true : false;
    this.showFinishedCheckboxValue = localStorage.getItem('showFinished') === 'true' ? true : false;
  }

  showFinishedFilter() {
    this.filterService.applyShowFinishedFilter(this.showFinishedCheckboxValue);
  }

  showTrackedTeamsFilter() {
    this.filterService.applyShowTrackedTeamsFilter(this.showCheckedTeamsCheckboxValue);
  }

}
