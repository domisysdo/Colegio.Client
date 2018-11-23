import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { TipoTelefonoDto, TipoTelefonoServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-tipo-telefono',
    templateUrl: './edit-tipo-telefono.component.html'
})
export class EditTipoTelefonoComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoTelefono: TipoTelefonoDto = new TipoTelefonoDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _tipoTelefonoService: TipoTelefonoServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._tipoTelefonoService.get(id)
            .subscribe(
            (result) => {
                this.tipoTelefono = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._tipoTelefonoService.update(this.tipoTelefono)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-telefono'])
    }
}
