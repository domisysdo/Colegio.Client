import { Component, Injector, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LoginService } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.less',
    './login.component.css'
  ],

  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {

  @ViewChild('cardBody') cardBody: ElementRef;

  submitting: boolean = false;
  confirmado: boolean = false;
  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _router: Router,
    private _sessionService: AbpSessionService,

  ) {
    super(injector);
  }

  ngAfterViewInit(): void {

  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(form: NgForm): void {

    if (form.valid) {
      this.submitting = true;
      this.loginService.authenticate(
        () => this.submitting = false
      );
    }
  }
}
