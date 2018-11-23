import { Component, OnInit } from '@angular/core';
import { Helpers } from '@app/helpers';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    Helpers.initLayout();
  }
}
