import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';
import { NavStateService } from '../../../../core/services/nav-state.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  showCheckedTeamsCheckboxValue: boolean;
  showFinishedCheckboxValue: boolean;
  showPostponedCheckboxValue: boolean;
  isFavourite = false;
  filterGroup: FormGroup;

  constructor(private filterService: FilterService, private navState: NavStateService, formBuilder: FormBuilder) {
    const showCheckedTeams = localStorage.getItem('showTrackedTeams');
    if (!showCheckedTeams) {
      this.filterService.applyShowTrackedTeamsFilter(true);
    }
    const showFinished = localStorage.getItem('showFinished');
    if (!showFinished) {
      this.filterService.applyShowFinishedFilter(true);
    }
    const showPostponed = localStorage.getItem('showPostponed');
    if (!showPostponed) {
      this.filterService.applyShowPostponedFilter(true);
    }
    this.showCheckedTeamsCheckboxValue = localStorage.getItem('showTrackedTeams') === 'true' ? true : false;
    this.showFinishedCheckboxValue = localStorage.getItem('showFinished') === 'true' ? true : false;
    this.showPostponedCheckboxValue = localStorage.getItem('showPostponed') === 'true' ? true : false;

    this.filterGroup = formBuilder.group({
      showFinished: this.showFinishedCheckboxValue,
      showPostponed: this.showPostponedCheckboxValue,
      showTrackedTeams: this.showCheckedTeamsCheckboxValue,
    });
  }

  ngOnInit(): void {
    this.isFavourite = this.navState.getCurrentState().mode === 'favourite';
  }

  showFinishedFilter() {
    this.filterService.applyShowFinishedFilter(this.filterGroup.value.showFinished);
  }

  showPostponedFilter() {
    this.filterService.applyShowPostponedFilter(this.filterGroup.value.showPostponed);
  }

  showTrackedTeamsFilter() {
    this.filterService.applyShowTrackedTeamsFilter(this.filterGroup.value.showTrackedTeams);
  }
}
