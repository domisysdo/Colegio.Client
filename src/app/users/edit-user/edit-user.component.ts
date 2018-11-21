import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, UserDto, RoleDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-user-modal',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent extends AppComponentBase implements OnInit {

    @ViewChild('editUserModal') modal: ModalDirective;
    @ViewChild('content') content: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    user: UserDto = new UserDto();
    roles: RoleDto[] = null;

    validation = {
        confirmPassword: ''
    };

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._userService.getRoles()
            .subscribe((result) => {
                this.roles = result.items;
            });

        this._userService.get(id)
            .subscribe(
            (result) => {
                this.user = result;
                this.active = true;
            }
        );
    }

    userInRole(role: RoleDto, user: UserDto): string {
        if (user.roleNames.indexOf(role.normalizedName) !== -1) {
            return 'checked';
        } else {
            return '';
        }
    }

    save(): void {
        const roles = [];
        $(this.content.nativeElement).find('[name=role]').each(function (ind: number, elem: Element) {
            if ($(elem).is(':checked')) {
                roles.push(elem.getAttribute('value').valueOf());
            }
        });

        this.user.roleNames = roles;

        this.saving = true;
        this._userService.update(this.user)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/users'])
    }
}
