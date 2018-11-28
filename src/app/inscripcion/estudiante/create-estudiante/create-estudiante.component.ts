import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';

import {
    EstudianteDto, EstudianteServiceProxy, NacionalidadServiceProxy, NacionalidadDto, TelefonoEstudianteDto,
    TipoTelefonoDto, TipoTelefonoServiceProxy, EmailEstudianteDto, TipoEmailServiceProxy, TipoEmailDto
} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';
import { MessageHelper } from '@app/shared/MessageHelper';


@Component({
    selector: 'app-create-estudiante',
    templateUrl: './create-estudiante.component.html'
})
export class CreateEstudianteComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    estudiante: EstudianteDto = new EstudianteDto();
    nacionalidades: NacionalidadDto[];
    tiposTelefono: TipoTelefonoDto[];
    tiposEmail: TipoEmailDto[];
    telefonos: TelefonoEstudianteDto[] = [];
    emails: EmailEstudianteDto[] = [];

    active = false;
    saving = false;
    editando = false;
    sexo = SexoArray.Sexo;
    estadoCivil = SexoArray.EstadoCivil;
    ngxDatatableHelper = NgxDatatableHelper;
    maskTelefono = MascarasConstantes;

    indexElementoSeleccionado = -1;
    elementoLista: any;
    elementoSelect: any;

    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy,
        private _nacionalidadService: NacionalidadServiceProxy,
        private _tipoTelefonoService: TipoTelefonoServiceProxy,
        private _tipoEmailService: TipoEmailServiceProxy,
        private modalHelper: ModalHelper,

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.obtenerNacionalidades();
        this.obtenerTiposTelefono();
        this.obtenerValoresDefecto();
        this.obtenerTiposEmail();
    }

    save(form: NgForm): void {
        if (form.valid) {

            this.agregarRelaciones();
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

    obtenerNacionalidades() {
        this._nacionalidadService.getAllForSelect()
            .subscribe((result: NacionalidadDto[]) => {
                this.nacionalidades = result;
            });
    }

    obtenerTiposTelefono() {
        this._tipoTelefonoService.getAllForSelect()
            .subscribe((result: TipoTelefonoDto[]) => {
                this.tiposTelefono = result;
            });
    }

    obtenerTiposEmail() {
        this._tipoEmailService.getAllForSelect()
            .subscribe((result: TipoEmailDto[]) => {
                this.tiposEmail = result;
            });
    }

    obtenerValoresDefecto() {
        this.estudiante.init({ estado: 1 });
    }

    agregarTelefono(content) {
        this.indexElementoSeleccionado = -1;
        this.elementoLista = new TelefonoEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    agregarEmail(content) {
        this.indexElementoSeleccionado = -1;
        this.elementoLista = new EmailEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarTelefonos() {
        if (!this.telefonoExisteDetalle()) {
            this.elementoLista.tipoTelefonoNombre = this.elementoSelect.descripcion;

            if (this.indexElementoSeleccionado >= 0) {
                this.telefonos[this.indexElementoSeleccionado] = this.elementoLista;
            } else {
                this.telefonos.push(this.elementoLista);
            }

            this.telefonos = [...this.telefonos];
            this.indexElementoSeleccionado = -1;
            this.elementoLista = null;
            this.modal.close();
        }
    }

    registrarEmails() {
        if (!this.emailExisteDetalle()) {
            this.elementoLista.tipoEmailNombre = this.elementoSelect.descripcion;

            if (this.indexElementoSeleccionado >= 0) {
                this.emails[this.indexElementoSeleccionado] = this.elementoLista;
            } else {
                this.emails.push(this.elementoLista);
            }

            this.emails = [...this.emails];
            this.indexElementoSeleccionado = -1;
            this.elementoLista = null;
            this.modal.close();
        }
    }

    editarTelefono(tele: TelefonoEstudianteDto, content) {
        this.indexElementoSeleccionado = this.telefonos.indexOf(tele);
        this.elementoLista = JSON.parse(JSON.stringify(tele));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarEmail(email: EmailEstudianteDto, content) {
        this.indexElementoSeleccionado = this.emails.indexOf(email);
        this.elementoLista = JSON.parse(JSON.stringify(email));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
            }
        );
    }

    telefonoExisteDetalle(): boolean {
        for (const item of this.telefonos) {
            if (this.telefonos.indexOf(item) !== this.indexElementoSeleccionado &&
                item.numero === this.elementoLista.numero) {
                MessageHelper.show('El teléfono ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    emailExisteDetalle(): boolean {
        for (const item of this.emails) {
            if (this.emails.indexOf(item) !== this.indexElementoSeleccionado &&
                item.email === this.elementoLista.email) {
                MessageHelper.show('El email ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoTelefonoChange(event: any) {
        this.elementoSelect = event;
    }

    onTipoEmailChange(event: any) {
        this.elementoSelect = event;
    }

    agregarRelaciones() {
        this.estudiante.listaTelefonos = this.telefonos;
        this.estudiante.listaEmail = this.emails;
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/estudiante'])
    }
}
