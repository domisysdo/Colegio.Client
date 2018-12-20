import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { GrupoDto, GrupoServiceProxy, MateriaDto, MateriaServiceProxy,
        AulaServiceProxy, AulaDto, Horario, HorarioDto, ProfesorGrupoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';

@Component({
  selector: 'app-create-grupo',
  templateUrl: './create-grupo.component.html'
})
export class CreateGrupoComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    ngxDatatableHelper = NgxDatatableHelper;
    indexElementoSeleccionado = 0;
    aulaSelect: any;
    grupo: GrupoDto = new GrupoDto();
    horario: HorarioDto = new HorarioDto();
    materias: MateriaDto[] = [];
    aulas: AulaDto[] = [];
    dias = SexoArray.DiaSemana;
    masks = MascarasConstantes;

    public modal: NgbModalRef;


    constructor(
        injector: Injector,
        private _router: Router,
        private _grupoService: GrupoServiceProxy,
        private _materiaService: MateriaServiceProxy,
        private _route: ActivatedRoute,
        private modalHelper: ModalHelper,
        private _aulaService: AulaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.obtenerValoresDefecto();
        this.obtenerMaterias();
        this.obtenerAulas();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._grupoService.create(this.grupo)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }
    obtenerMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }

    agregarHorario(content: any) {
        this.indexElementoSeleccionado = -1;
        this.horario = new HorarioDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarHorario() {

        if (this.aulaSelect) {
            this.horario.aulaIdentificador = this.aulaSelect.identificador;
        }

        const horarioAgregar = new HorarioDto({
            aulaId: this.horario.aulaId,
            aulaIdentificador: this.horario.aulaIdentificador,
            dia: this.horario.dia,
            grupoId: this.horario.grupoId,
            horaFin: this.horario.horaFin,
            horaInicio: this.horario.horaInicio,
            id: 0
        })


        if (!this.horarioExisteDetalle()) {
            if (this.indexElementoSeleccionado >= 0) {
                this.grupo.listaHorarios[this.indexElementoSeleccionado] = horarioAgregar;
            } else {
                this.grupo.listaHorarios.push(horarioAgregar);
            }
            this.grupo.listaHorarios = [...this.grupo.listaHorarios]
            this.modal.close();
        }
    }

    horarioExisteDetalle(): boolean {

        for (const item of this.grupo.listaHorarios) {
            if (this.grupo.listaHorarios.indexOf(item) !== this.indexElementoSeleccionado &&
                item.aulaIdentificador === this.horario.aulaIdentificador
                ) {
                MessageHelper.show('El horario ya existe en el detalle', 'Ya existe');
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
        this.grupo.init({ listaHorarios: [] })
    }

    obtenerAulas() {
        this._aulaService.getAllForSelect()
        .subscribe((result: AulaDto[]) => {
            this.aulas = result;
        });
    }

    onAulaChange(event: any) {
        this.aulaSelect = event;
    }


    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/grupo'])
    }
}
