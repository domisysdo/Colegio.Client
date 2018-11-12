import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent extends AppComponentBase implements OnInit {

  shownLoginName = '';

  constructor(
      injector: Injector,
      private _authService: AppAuthService
  ) {
      super(injector);
  }

  ngOnInit() {
      this.shownLoginName = this.appSession.getShownLoginName();
  }

  logout(): void {
      this._authService.logout();
  }
}
