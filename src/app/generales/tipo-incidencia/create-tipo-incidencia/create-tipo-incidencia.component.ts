import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { TipoIncidenciaDto, TipoIncidenciaServiceProxy} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-tipo-incidencia',
  templateUrl: './create-tipo-incidencia.component.html'
})
export class CreateTipoIncidenciaComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    tipoIncidencia: TipoIncidenciaDto = new TipoIncidenciaDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoIncidenciaService: TipoIncidenciaServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {

    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._tipoIncidenciaService.create(this.tipoIncidencia)
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
        this._router.navigate(['app/generales/tipo-incidencia'])
    }
}
