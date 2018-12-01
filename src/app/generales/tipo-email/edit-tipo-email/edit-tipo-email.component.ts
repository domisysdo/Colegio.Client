import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { TipoEmailDto, TipoEmailServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-tipo-email',
    templateUrl: './edit-tipo-email.component.html'
})
export class EditTipoEmailComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoEmail: TipoEmailDto = new TipoEmailDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _tipoEmailService: TipoEmailServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._tipoEmailService.get(id)
            .subscribe(
            (result) => {
                this.tipoEmail = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._tipoEmailService.update(this.tipoEmail)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-email'])
    }
}
