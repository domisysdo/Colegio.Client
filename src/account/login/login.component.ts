import { Component, Injector, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LoginService } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { NgForm } from '@angular/forms';
import { UserServiceProxy, ChangeUserLanguageDto } from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.less',
    './login.component.css'
  ],

  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit {


  @ViewChild('cardBody') cardBody: ElementRef;

  submitting = false;
  confirmado = false;
  language = new ChangeUserLanguageDto();


  constructor(
    injector: Injector,
    public loginService: LoginService,
    private _router: Router,
    private _sessionService: AbpSessionService,
    private _userService: UserServiceProxy

  ) {
    super(injector);
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

  ngOnInit(): void {
    this.language.languageName = 'es-MX';
    this._userService.changeLanguage(this.language);
    console.log('changed');
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
