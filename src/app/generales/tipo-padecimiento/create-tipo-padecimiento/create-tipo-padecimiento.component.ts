import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { TipoPadecimientoDto, TipoPadecimientoServiceProxy} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-tipo-padecimiento',
  templateUrl: './create-tipo-padecimiento.component.html'
})
export class CreateTipoPadecimientoComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoPadecimiento: TipoPadecimientoDto = new TipoPadecimientoDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoPadecimientoService: TipoPadecimientoServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._tipoPadecimientoService.create(this.tipoPadecimiento)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-padecimiento'])
    }
}
