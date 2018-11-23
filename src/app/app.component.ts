import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { Helpers } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        // Helpers.bodyClass('fixed-navbar');
         Helpers.bodyClass('fixed-layout');

      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        Helpers.setLoading(false);

        // Initialize page: handlers ...
        Helpers.initPage();
      }
    });
  }
}
