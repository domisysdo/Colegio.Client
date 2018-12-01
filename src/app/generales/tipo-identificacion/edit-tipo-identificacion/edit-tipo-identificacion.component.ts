import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { TipoIdentificacionDto, TipoIdentificacionServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-tipo-identificacion',
    templateUrl: './edit-tipo-identificacion.component.html'
})
export class EditTipoIdentificacionComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoIdentificacion: TipoIdentificacionDto = new TipoIdentificacionDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _tipoIdentificacionService: TipoIdentificacionServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._tipoIdentificacionService.get(id)
            .subscribe(
            (result) => {
                this.tipoIdentificacion = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._tipoIdentificacionService.update(this.tipoIdentificacion)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-identificacion'])
    }
}
