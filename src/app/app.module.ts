import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { JsonpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    ServiceProxyModule,
    SharedModule
  ],
  providers: [],

  exports:
  [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    AbpModule,
    ServiceProxyModule,
    SharedModule
  ]
})
export class AppModule {}
