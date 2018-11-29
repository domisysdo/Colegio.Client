import { OnInit, Component, Input, Injector } from '@angular/core';
import { FamiliarEstudianteDto, TelefonoFamiliarEstudianteDto,
         EmailFamiliarEstudianteDto, DireccionFamiliarEstudianteDto,
         ParentescoDto, ParentescoServiceProxy, ProfesionServiceProxy, ProfesionDto,
         NacionalidadDto, NacionalidadServiceProxy } from '@shared/service-proxies/service-proxies';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { EMAIL_PATTERN } from '@shared/helpers/constantes-globales';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import * as moment from 'moment';


@Component({
  selector: 'app-familiar-estudiante',
  templateUrl: './familiar-estudiante.component.html'
})
export class FamiliarEstudianteComponent extends AppComponentBase implements OnInit {
  indexElementoSeleccionado = -1;
  elementoLista: any;
  parentescoSelect: any;

  sexo = SexoArray.Sexo;
  estadoCivil = SexoArray.EstadoCivil;
  ngxDatatableHelper = NgxDatatableHelper;
  telefonosFamiliar: TelefonoFamiliarEstudianteDto[] = [];
  emailsFamiliar: EmailFamiliarEstudianteDto[] = [];
  direccionesFamiliar: DireccionFamiliarEstudianteDto[] = [];
  parentescos: ParentescoDto[] = [];
  profesiones: ProfesionDto[] = [];
  nacionalidades: NacionalidadDto[] = [];

  emailPattern = EMAIL_PATTERN;
  public modal: NgbModalRef;

  @Input() familiares: FamiliarEstudianteDto[] = [];

  constructor(
    injector: Injector,
    private _parentescoService: ParentescoServiceProxy,
    private _profesionService: ProfesionServiceProxy,
    private _nacionalidadService: NacionalidadServiceProxy,
    private modalHelper: ModalHelper
  ) {
      super(injector)
  }

    ngOnInit(): void {
        this.obtenerParentescos();
        this.obtenerProfesiones();
        this.obtenerNacionalidades();
    }

    obtenerParentescos() {
        this._parentescoService.getAllForSelect()
            .subscribe((result: ParentescoDto[]) => {
                this.parentescos = result;
            });
    }

    obtenerNacionalidades() {
        this._nacionalidadService.getAllForSelect()
            .subscribe((result: NacionalidadDto[]) => {
                this.nacionalidades = result;
            });
    }

    obtenerProfesiones() {
        this._profesionService.getAllForSelect()
            .subscribe((result: ProfesionDto[]) => {
                this.profesiones = result;
            });
    }

    agregarFamiliar(content) {
        this.indexElementoSeleccionado = -1;
        this.elementoLista = new FamiliarEstudianteDto();
        this.modal = this.modalHelper.getLargeModal(content);
    }

    editarFamiliar(familiar: FamiliarEstudianteDto, content) {
        this.indexElementoSeleccionado = this.familiares.indexOf(familiar);
        this.elementoLista = JSON.parse(JSON.stringify(familiar));
        this.modal = this.modalHelper.getLargeModal(content);
    }

    registrarFamiliares() {
        if (!this.familiarExisteDetalle()) {
            this.elementoLista.nombreCompleto = this.elementoLista.nombres + ' ' +
            this.elementoLista.primerApellido + ' ' + this.elementoLista.segundoApellido;
            this.elementoLista.parentescoNombre = this.parentescoSelect.descripcion;
            // this.elementoLista.fechaNacimiento = moment(this.elementoLista.fechaNacimiento); // .format('YYYY/MM/DD');

            if (this.indexElementoSeleccionado >= 0) {
                this.familiares[this.indexElementoSeleccionado] = this.elementoLista;
            } else {
                this.familiares.push(this.elementoLista);
            }
            console.log(this.familiares);
            this.familiares = [...this.familiares];
            this.indexElementoSeleccionado = -1;
            this.elementoLista = null;
            this.modal.close();
        }
    }

    familiarExisteDetalle(): boolean {
        for (const item of this.familiares) {
            if (this.familiares.indexOf(item) !== this.indexElementoSeleccionado &&
                item.identificador === this.elementoLista.identificador
                ) {
                MessageHelper.show('El familiar ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onParentescoChange(event: any) {
        this.parentescoSelect = event;
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
}
