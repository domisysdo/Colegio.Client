import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, AfterViewInit, OnInit, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { RoleServiceProxy, GetRoleForEditOutput, RoleDto, RoleEditDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-edit-role-modal',
    templateUrl: './edit-role.component.html'
})

export class EditRoleComponent extends AppComponentBase implements OnInit {


    @ViewChild('editRoleModal') modal: ModalDirective;
    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;

    model: GetRoleForEditOutput = new GetRoleForEditOutput();

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        injector: Injector,
        private _roleService: RoleServiceProxy,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initializeValues();
        const id = this._route.snapshot.params['id'];
        this._roleService.getRoleForEdit(id)
            .pipe(finalize(() => {
                this.active = true;
            }))
            .subscribe((result: GetRoleForEditOutput) => {
                this.model = result;
            });
    }

    checkPermission(permissionName: string): string {
        if (this.model.grantedPermissionNames.indexOf(permissionName) !== -1) {
            return 'checked';
        } else {
            return '';
        }
    }

    save(form: NgForm): void {
        const role = this.model.role;
        if (form.valid) {
            const permissions = [];
            $(this.content.nativeElement).find('[name=permission]').each(
                function (index: number, elem: Element) {
                    if ($(elem).is(':checked') === true) {
                        permissions.push(elem.getAttribute('value').valueOf());
                    }
                }
            )

            this.saving = true;
            const input = new RoleDto();

            input.name = role.name;
            input.displayName = role.displayName;
            input.description = role.description;
            input.id = role.id;
            input.isStatic = role.isStatic;
            input.permissions = permissions;


            this._roleService.update(input)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
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

    initializeValues(): void {
        this.model = new GetRoleForEditOutput();
        this.model.role = new RoleEditDto();
    }
}
