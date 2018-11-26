import { Component, ViewChild, Injector, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { EstudianteDto, EstudianteServiceProxy, NacionalidadServiceProxy, NacionalidadDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-estudiante',
    templateUrl: './create-estudiante.component.html'
})
export class CreateEstudianteComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    estudiante: EstudianteDto = new EstudianteDto();
    nacionalidades: NacionalidadDto[];

    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy,
        private _nacionalidadService: NacionalidadServiceProxy

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNacionalidades();
    }


    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._estudianteService.create(this.estudiante)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true });
        }
    }

    getNacionalidades() {
        this._nacionalidadService.getAllForSelect()
            .subscribe((result: NacionalidadDto[]) => {
                this.nacionalidades = result;
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/estudiante'])
    }
}
