import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { TipoDireccionDto, TipoDireccionServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-tipo-direccion',
    templateUrl: './edit-tipo-direccion.component.html'
})
export class EditTipoDireccionComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoDireccion: TipoDireccionDto = new TipoDireccionDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _tipoDireccionService: TipoDireccionServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._tipoDireccionService.get(id)
            .subscribe(
            (result) => {
                this.tipoDireccion = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._tipoDireccionService.update(this.tipoDireccion)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-direccion'])
    }
}
