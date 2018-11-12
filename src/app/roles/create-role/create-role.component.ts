import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { RoleServiceProxy, CreateRoleDto, ListResultDtoOfPermissionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { MessageHelper } from '@app/shared/MessageHelper';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-role-modal',
    templateUrl: './create-role.component.html'
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {
    @ViewChild('createRoleModal') modal: ModalDirective;
    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;

    permissions: ListResultDtoOfPermissionDto = new ListResultDtoOfPermissionDto();
    role: CreateRoleDto = new CreateRoleDto();

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    c: string[];

    constructor(
        injector: Injector,
        private _router: Router,
        private _roleService: RoleServiceProxy

    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._roleService.getAllPermissions()
            .subscribe((permissions: ListResultDtoOfPermissionDto) => {
                this.permissions = permissions;
              });
    }

    show(): void {
        this.active = true;
        this.role = new CreateRoleDto();
        this.role.init({ isStatic: false });

        this.modal.show();
    }

    save(form: NgForm): void {

        const permissions = [];
        if (form.valid) {

            $(this.content.nativeElement).find('[name=permission]').each(
                (index: number, elem: Element) => {
                    if ($(elem).is(':checked')) {
                        permissions.push(elem.getAttribute('value').valueOf());
                    }
                }
            );

            this.role.permissions = permissions;

            this.saving = true;
            this._roleService.create(this.role)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                    this.modalSave.emit(null);
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/roles'])
    }
}
