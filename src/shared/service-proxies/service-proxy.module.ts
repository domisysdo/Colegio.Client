import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.PaisServiceProxy,
        ApiServiceProxies.ProvinciaServiceProxy,
        ApiServiceProxies.MunicipioServiceProxy,
        ApiServiceProxies.SectorServiceProxy,
        ApiServiceProxies.TipoTelefonoServiceProxy,
        ApiServiceProxies.TipoDireccionServiceProxy,
        ApiServiceProxies.ProfesorServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
