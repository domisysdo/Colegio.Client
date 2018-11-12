﻿import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from 'shared/directives/material-input.directive';
import { InputValidationComponent } from './components/validation/input-validation/input-validation.component';

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule
    ],
    declarations: [
        MaterialInput,
        InputValidationComponent
,


    ],
    exports: [
        MaterialInput,
        InputValidationComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}
