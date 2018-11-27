import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';
import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from 'shared/directives/material-input.directive';
import { InputValidationComponent } from './components/validation/input-validation/input-validation.component';
import { TableItemsDeleteComponent } from './components/tables/table-items-delete/table-items-delete.component';
import { InputDateComponent } from './components/input-date/input-date-component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalHelper } from './helpers/ModalHelper';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        AbpModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [
        MaterialInput,
        InputValidationComponent,
        TableItemsDeleteComponent,
        InputDateComponent
    ],
    exports: [
        NgbModule,
        MaterialInput,
        InputValidationComponent,
        TableItemsDeleteComponent,
        InputDateComponent
    ],
    providers: [
        ModalHelper
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
