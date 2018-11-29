import { OnInit, Component, Input, Injector } from '@angular/core';
import {
  TelefonoEstudianteDto,
  TipoTelefonoServiceProxy,
  TipoTelefonoDto
} from '@shared/service-proxies/service-proxies';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  selector: 'app-telefono-estudiante',
  templateUrl: './telefono-estudiante.component.html'
})
export class TelefonoEstudianteComponent extends AppComponentBase implements OnInit {
  indexElementoSeleccionado = -1;
  elementoLista: any;
  elementoSelect: any;
  tiposTelefono: TipoTelefonoDto[];
  maskTelefono = MascarasConstantes;
  ngxDatatableHelper = NgxDatatableHelper;

  public modal: NgbModalRef;

  @Input() telefonos: TelefonoEstudianteDto[] = [];

  constructor(
    injector: Injector,
    private _tipoTelefonoService: TipoTelefonoServiceProxy,
    private modalHelper: ModalHelper
  ) {
      super(injector)
  }

    ngOnInit(): void {
        this.obtenerTiposTelefono();
    }


    obtenerTiposTelefono() {
    this._tipoTelefonoService.getAllForSelect()
        .subscribe((result: TipoTelefonoDto[]) => {
            this.tiposTelefono = result;
        });
    }

    agregarTelefono(content) {
        this.indexElementoSeleccionado = -1;
        this.elementoLista = new TelefonoEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarTelefono(telefono: TelefonoEstudianteDto, content) {
        this.indexElementoSeleccionado = this.telefonos.indexOf(telefono);
        this.elementoLista = JSON.parse(JSON.stringify(telefono));
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

    telefonoExisteDetalle(): boolean {
        for (const item of this.telefonos) {
            if (this.telefonos.indexOf(item) !== this.indexElementoSeleccionado &&
                item.numero === this.elementoLista.numero) {
                MessageHelper.show('El télefono ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoTelefonoChange(event: any) {
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
