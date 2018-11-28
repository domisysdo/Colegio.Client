import { OnInit, Component, Input, Injector } from '@angular/core';
import {
  EmailEstudianteDto,
  TipoEmailServiceProxy,
  TipoEmailDto
} from '@shared/service-proxies/service-proxies';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { EMAIL_PATTERN } from '@shared/helpers/constantes-globales';

@Component({
  selector: 'app-email-estudiante',
  templateUrl: './email-estudiante.component.html'
})
export class EmailEstudianteComponent extends AppComponentBase implements OnInit {
  indexElementoSeleccionado = -1;
  elementoLista: any;
  elementoSelect: any;
  tiposEmail: TipoEmailDto[];
  ngxDatatableHelper = NgxDatatableHelper;

  emailPattern = EMAIL_PATTERN;
  public modal: NgbModalRef;

  @Input() emails: EmailEstudianteDto[] = [];

  constructor(
    injector: Injector,
    private _tipoEmailService: TipoEmailServiceProxy,
    private modalHelper: ModalHelper
  ) {
      super(injector)
  }

    ngOnInit(): void {
        this.obtenerTiposEmail();
    }


    obtenerTiposEmail() {
    this._tipoEmailService.getAllForSelect()
        .subscribe((result: TipoEmailDto[]) => {
            this.tiposEmail = result;
        });
    }

    agregarEmail(content) {
        this.indexElementoSeleccionado = -1;
        this.elementoLista = new EmailEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarEmail(email: EmailEstudianteDto, content) {
        this.indexElementoSeleccionado = this.emails.indexOf(email);
        this.elementoLista = JSON.parse(JSON.stringify(email));
        this.modal = this.modalHelper.getMediumModal(content);
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

    onTipoEmailChange(event: any) {
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
