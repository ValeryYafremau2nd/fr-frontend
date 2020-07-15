import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {

  players = [
    {
      name: 'Antonio Zabuli',
      age: 26,
      number: 12
    },
    {
      name: 'Antonio Zabuli',
      age: 26,
      number: 12
    },
    {
      name: 'Antonio Zabuli',
      age: 26,
      number: 12
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
