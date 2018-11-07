import { Component, OnInit } from '@angular/core';
import { Helpers } from '@app/helpers';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    Helpers.initLayout();
  }
}
