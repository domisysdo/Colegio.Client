import { Component, ViewChild, Injector, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { EstudianteDto, EstudianteServiceProxy, NacionalidadServiceProxy,
        NacionalidadDto, TelefonoEstudianteDto, TelefonoEstudianteServiceProxy,
        TipoTelefonoDto, TipoTelefonoServiceProxy, ITelefonoEstudianteDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { ModalDirective } from 'ngx-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';



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
    tipoTelefonos: TipoTelefonoDto[];
    telefonos: TelefonoEstudianteDto[] = [];

    telefono: TelefonoEstudianteDto = new TelefonoEstudianteDto();
    sexo =  SexoArray.Sexo;
    estadoCivil =  SexoArray.EstadoCivil;
    ngxDatatableHelper = NgxDatatableHelper;

    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy,
        private _nacionalidadService: NacionalidadServiceProxy,
        private _telefonoEstudianteService: TelefonoEstudianteServiceProxy,
        private _tipoTelefonoService: TipoTelefonoServiceProxy,
        private modalHelper: ModalHelper,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNacionalidades();
        // this.getTelefonosEstudiante();
        this.getTipoTelefonos();
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


    }

    getTipoTelefonos() {
        this._tipoTelefonoService.getAllForSelect()
        .subscribe((result: TipoTelefonoDto[]) => {
            this.tipoTelefonos = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/estudiante'])
    }

    defaultValues() {
        this.estudiante.init({ estado: 1 });
    }

    mostrarModalTelefonos(content) {
        this.modal = this.modalHelper.getMediumModal(content);
    }

    agregarTelefono() {
        this.telefonos.push(this.telefono);
        this.telefonos = this.telefonos.slice();
        this.modal.close();
        this.telefono = new TelefonoEstudianteDto();
    }
}
