import { Component, ViewChild, Injector, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { EstudianteDto, EstudianteServiceProxy, NacionalidadServiceProxy,
        NacionalidadDto, TelefonoEstudianteDto, TelefonoEstudianteServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';


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
    telefonos: TelefonoEstudianteDto[] = [];
    sexo =  SexoArray.Sexo;
    estadoCivil =  SexoArray.EstadoCivil;
    ngxDatatableHelper = NgxDatatableHelper;
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;


    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy,
        private _nacionalidadService: NacionalidadServiceProxy,
        private _telefonoEstudianteService: TelefonoEstudianteServiceProxy

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNacionalidades();
        this.getTelefonosEstudiante();
        this.defaultValues();
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

    getTelefonosEstudiante() {
        this._telefonoEstudianteService.getAllForSelect()
            .subscribe((result: TelefonoEstudianteDto[]) => {
                this.telefonos = result;
                alert(result);
            });

    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/estudiante'])
    }

    defaultValues() {
        this.estudiante.init({ estado: 1 });
    }

    onSelect({ selected }) {
        this.selected = selected
        this.selectedCount = selected.length;
        this.ngxDatatableHelper.selectedCountMessages(this.selectedCount);
    }

    onSort(event: any) {
    }

    onPageChange(event: any)  {

    }
}
