import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent {
  @Input() tracked: boolean = false;
  @Input() itemId: number;
  @Input() tracker: (id: number) => void;
  @Input() untracker: (id: number) => void;

  constructor() {}

  track(): void {
    this.tracked = !this.tracked;
    this.tracker(this.itemId);
  }

  untrack(): void {
    this.tracked = !this.tracked;
    this.untracker(this.itemId);
  }
}
