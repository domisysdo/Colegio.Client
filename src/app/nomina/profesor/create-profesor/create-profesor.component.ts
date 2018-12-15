import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { ProfesorDto, ProfesorServiceProxy, ProfesorGrupoDto,
        MateriaDto, MateriaServiceProxy, GrupoServiceProxy, GrupoDto } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageHelper } from '@app/shared/MessageHelper';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MateriaComponent } from '@app/inscripcion/materia/materia.component';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
  selector: 'app-create-profesor',
  templateUrl: './create-profesor.component.html'
})
export class CreateProfesorComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    editando = false;

    profesor: ProfesorDto = new ProfesorDto();
    profesorGrupo: ProfesorGrupoDto = new ProfesorGrupoDto();
    indexElementoSeleccionado = -1;
    grupos: GrupoDto[] = []
    ngxDatatableHelper = NgxDatatableHelper;
    grupoSelect: any;
    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _route: ActivatedRoute,
        private modalHelper: ModalHelper,
        private _profesorService: ProfesorServiceProxy,
        private _grupoService: GrupoServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.obtenerValoresDefecto();
        this.obtenerGrupos();

        const id = this._route.snapshot.params['id'];

        if (id > 0) {
            this.editando = true;
            this._profesorService.getIncluding(id)
            .subscribe(
                (result) => {
                    this.profesor = result;
                    this.active = true;
                }
            );
        }
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._profesorService.create(this.profesor)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    agregarMetodoEvaluacion(content: any) {
        this.indexElementoSeleccionado = -1;
        this.profesorGrupo = new ProfesorGrupoDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarMetodoEvaluacion() {

        if (this.grupoSelect) {
            this.profesorGrupo.grupoIdentificador = this.grupoSelect.identificador;
        }

        const grupoAgregar = new ProfesorGrupoDto({
            profesorId: this.profesorGrupo.profesorId,
            profesorNombre: this.profesorGrupo.profesorNombre,
            grupoIdentificador: this.profesorGrupo.grupoIdentificador,
            grupoId: this.profesorGrupo.grupoId
        })


        if (!this.metodoEvaluacionExisteDetalle()) {
            if (this.indexElementoSeleccionado >= 0) {
                this.profesor.listaGrupos[this.indexElementoSeleccionado] = grupoAgregar;
            } else {
                this.profesor.listaGrupos.push(grupoAgregar);
            }
            this.profesor.listaGrupos = [...this.profesor.listaGrupos]
            this.modal.close();
        }
    }

    metodoEvaluacionExisteDetalle(): boolean {

        for (const item of this.profesor.listaGrupos) {
            if (this.profesor.listaGrupos.indexOf(item) !== this.indexElementoSeleccionado &&
                item.grupoIdentificador === this.profesorGrupo.grupoIdentificador
                ) {
                MessageHelper.show('El grupo ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    eliminarElementoLista(lista: any[], row: any) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
            }
        );
    }

    obtenerValoresDefecto() {
        this.profesor.init({ listaGrupos: [] })
    }

    obtenerGrupos() {
        this._grupoService.getAllForSelect()
        .subscribe((result: GrupoDto[]) => {
            this.grupos = result;
        });
    }

    onGrupoChange(event: any) {
        this.grupoSelect = event;
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/nomina/profesor'])
    }
}
