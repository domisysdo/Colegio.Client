import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { EstudianteServiceProxy, EstudianteDto, RoleDto} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'edit-estudiante-modal',
    templateUrl: './edit-estudiante.component.html'
})
export class EditEstudianteComponent extends AppComponentBase {

    @ViewChild('editEstudianteModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;

    estudiante: EstudianteDto = null;
    roles: RoleDto[] = null;

    constructor(
        injector: Injector,
        private _estudianteService: EstudianteServiceProxy
    ) {
        super(injector);
    }

    estudianteInRole(role: RoleDto, estudiante: EstudianteDto): string {
        if (estudiante.roleNames.indexOf(role.normalizedName) !== -1) {
            return "checked";
        }
        else {
            return "";
        }
    }

    show(id: number): void {
        this._estudianteService.getRoles()
            .subscribe((result) => {
                this.roles = result.items;
            });

        this._estudianteService.get(id)
            .subscribe(
            (result) => {
                this.estudiante = result;
                this.active = true;
                this.modal.show();
            }
            );
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {

        var roles = [];
        $(this.modalContent.nativeElement).find("[name=role]").each(function (ind: number, elem: Element) {
            if ($(elem).is(":checked")) {
                roles.push(elem.getAttribute("value").valueOf());
            }
        });

        this.estudiante.roleNames = roles;

        this.saving = true;
        this._estudianteService.update(this.estudiante)
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
