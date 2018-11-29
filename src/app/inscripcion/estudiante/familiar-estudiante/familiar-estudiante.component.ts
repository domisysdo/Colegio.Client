import { OnInit, Component, Input, Injector } from '@angular/core';
import { FamiliarEstudianteDto, TelefonoFamiliarEstudianteDto,
         EmailFamiliarEstudianteDto, DireccionFamiliarEstudianteDto,
         ParentescoDto, ParentescoServiceProxy, ProfesionServiceProxy, ProfesionDto } from '@shared/service-proxies/service-proxies';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { EMAIL_PATTERN } from '@shared/helpers/constantes-globales';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';

@Component({
  selector: 'app-familiar-estudiante',
  templateUrl: './familiar-estudiante.component.html'
})
export class FamiliarEstudianteComponent extends AppComponentBase implements OnInit {
  indexElementoSeleccionado = -1;
  elementoLista: any;
  elementoSelect: any;

  sexo = SexoArray.Sexo;
  estadoCivil = SexoArray.EstadoCivil;
  ngxDatatableHelper = NgxDatatableHelper;
  telefonosFamiliar: TelefonoFamiliarEstudianteDto[] = [];
  emailsFamiliar: EmailFamiliarEstudianteDto[] = [];
  direccionesFamiliar: DireccionFamiliarEstudianteDto[] = [];
  parentescos: ParentescoDto[] = [];
  profesiones: ProfesionDto[] = [];

  emailPattern = EMAIL_PATTERN;
  public modal: NgbModalRef;

  @Input() familiares: FamiliarEstudianteDto[] = [];

  constructor(
    injector: Injector,
    private _parentescoService: ParentescoServiceProxy,
    private _profesionService: ProfesionServiceProxy,
    private modalHelper: ModalHelper
  ) {
      super(injector)
  }

    ngOnInit(): void {
        this.obtenerParentescos();
        this.obtenerProfesiones();
    }

    obtenerParentescos() {
        this._parentescoService.getAllForSelect()
            .subscribe((result: ParentescoDto[]) => {
                this.parentescos = result;
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
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarFamiliar(familiar: FamiliarEstudianteDto, content) {
        this.indexElementoSeleccionado = this.familiares.indexOf(familiar);
        this.elementoLista = JSON.parse(JSON.stringify(familiar));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarFamiliares() {
        if (!this.familiarExisteDetalle()) {
            this.elementoLista.tipoFamiliarNombre = this.elementoSelect.descripcion;

            if (this.indexElementoSeleccionado >= 0) {
                this.familiares[this.indexElementoSeleccionado] = this.elementoLista;
            } else {
                this.familiares.push(this.elementoLista);
            }

            this.familiares = [...this.familiares];
            this.indexElementoSeleccionado = -1;
            this.elementoLista = null;
            this.modal.close();
        }
    }

    familiarExisteDetalle(): boolean {
        for (const item of this.familiares) {
            if (this.familiares.indexOf(item) !== this.indexElementoSeleccionado &&
                item.identificador === this.elementoLista.identificador ||
                (item.nombres === this.elementoLista.nombres &&
                 item.primerApellido === this.elementoLista.primerApellido &&
                 item.segundoApellido === this.elementoLista.segundoApellido )) {
                MessageHelper.show('El familiar ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoFamiliarChange(event: any) {
        this.elementoSelect = event;
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
