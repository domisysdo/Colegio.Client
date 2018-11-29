import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { TipoPadecimientoDto, TipoPadecimientoServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-tipo-padecimiento',
    templateUrl: './edit-tipo-padecimiento.component.html'
})
export class EditTipoPadecimientoComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoPadecimiento: TipoPadecimientoDto = new TipoPadecimientoDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _tipoPadecimientoService: TipoPadecimientoServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._tipoPadecimientoService.get(id)
            .subscribe(
            (result) => {
                this.tipoPadecimiento = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._tipoPadecimientoService.update(this.tipoPadecimiento)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-padecimiento'])
    }
}
