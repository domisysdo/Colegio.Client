import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { TipoTelefonoDto, TipoTelefonoServiceProxy} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-tipo-telefono',
  templateUrl: './create-tipo-telefono.component.html'
})
export class CreateTipoTelefonoComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoTelefono: TipoTelefonoDto = new TipoTelefonoDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoTelefonoService: TipoTelefonoServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._tipoTelefonoService.create(this.tipoTelefono)
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
        this._router.navigate(['app/generales/tipo-telefono'])
    }
}
