import { Component, OnInit } from '@angular/core';
import { AppSessionService } from '@shared/session/app-session.service';
import { MessageHelper } from '@app/shared/MessageHelper';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css']
})
export class TopHeaderComponent implements OnInit {
  title = 'Utesa Institute';
  shortTitle = 'CL';
  fullUserName;
  user;
  constructor(
    private _sessionService: AppSessionService,
    private _authService: AppAuthService,
    private _router: Router,

  ) {}

  ngOnInit() {
    if (this._sessionService.user) {
      this.user = this._sessionService.user;
      this.fullUserName = this._sessionService.user.name + ' ' + this._sessionService.user.surname;
    } else {
      MessageHelper.show('No existe usuario logueado, se redigirirá al inicio de sesión', 'No logueado',
      () => {
        this._router.navigate(['account/login']);
      });
    }
  }

  logout(): void {
    this._authService.logout();
  }
}
