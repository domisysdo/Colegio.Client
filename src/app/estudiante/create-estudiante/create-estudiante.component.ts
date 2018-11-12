import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EstudianteServiceProxy, EstudianteDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-estudiante-modal',
  templateUrl: './create-estudiante.component.html'
})
export class CreateEstudianteComponent extends AppComponentBase implements OnInit {

    @ViewChild('createEstudianteModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    estudiante: EstudianteDto = null;
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private _estudianteService: EstudianteServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._estudianteService.getRoles()
        .subscribe((result) => {
            this.roles = result.items;
        });
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.estudiante = new EstudianteDto();
        this.estudiante.init({ isActive: true });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        // TODO: Refactor this, don't use jQuery style code
        const roles = [];
        $(this.modalContent.nativeElement).find('[name=role]').each((ind: number, elem: Element) => {
            if ($(elem).is(':checked') === true) {
                roles.push(elem.getAttribute('value').valueOf());
            }
        });

        this.estudiante.roleNames = roles;
        this.saving = true;

        this._estudianteService.create(this.estudiante)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
