import { OnInit, Component, Input, Injector, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';
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
export class EmailEstudianteComponent extends AppComponentBase implements OnInit, AfterContentChecked {

    email: EmailEstudianteDto;
    emailSelect: any;
    tiposEmail: TipoEmailDto[];
    listaVisualizacionEmail: EmailEstudianteDto[] = [];
    public modal: NgbModalRef;

    ngxDatatableHelper = NgxDatatableHelper;
    emailPattern = EMAIL_PATTERN;
    indexElementoSeleccionado = -1;

    @Input() emails: EmailEstudianteDto[];

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

    ngAfterContentChecked(): void {
        this.listaVisualizacionEmail = [...this.emails];
    }

    obtenerTiposEmail() {
        this._tipoEmailService.getAllForSelect()
            .subscribe((result: TipoEmailDto[]) => {
                this.tiposEmail = result;
            });
    }

    agregarEmail(content) {
        this.indexElementoSeleccionado = -1;
        this.email = new EmailEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarEmail(email: EmailEstudianteDto, content) {
        this.indexElementoSeleccionado = this.emails.indexOf(email);
        this.email = JSON.parse(JSON.stringify(email));
        console.log(this.email);
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarEmails() {

        const emailAgregar = new EmailEstudianteDto({
            estudianteId: this.email.estudianteId,
            email: this.email.email, tipoEmailId: this.email.tipoEmailId,
            tipoEmailNombre: this.email.tipoEmailNombre, id: 0
        })

        if (!this.emailExisteDetalle()) {
            if (this.emailSelect) {
                this.email.tipoEmailNombre = this.emailSelect.descripcion;
            }

            if (this.indexElementoSeleccionado >= 0) {
                this.emails[this.indexElementoSeleccionado] = emailAgregar;
            } else {
                this.emails.push(emailAgregar);
            }
            this.listaVisualizacionEmail = [...this.emails];
            this.modal.close();
        }
    }

    emailExisteDetalle(): boolean {
        for (const item of this.emails) {
            if (this.emails.indexOf(item) !== this.indexElementoSeleccionado &&
                item.email === this.email.email) {
                MessageHelper.show('El email ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoEmailChange(event: any) {
        this.emailSelect = event;
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
                this.listaVisualizacionEmail.splice(this.listaVisualizacionEmail.indexOf(row), 1);
            }
        );
    }
}
