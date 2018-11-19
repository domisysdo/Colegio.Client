import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { UserServiceProxy, CreateUserDto, RoleDto, UserDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    user: CreateUserDto = new CreateUserDto();
    roles: RoleDto[] = [];
    validation = {
        confirmPassword: ''
    };

    constructor(
        injector: Injector,
        private _router: Router,
        private _userService: UserServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initializeValues();
        this._userService.getRoles()
        .subscribe((result) => {
            this.roles = result.items;
        });
    }

    save(form: NgForm): void {
        // TODO: Refactor this, don't use jQuery style code
        const roles = [];
        if (form.valid) {
            if (!this.validate()) {
                return;
            }
            $(this.content.nativeElement).find('[name=role]').each((ind: number, elem: Element) => {
                if ($(elem).is(':checked') === true) {
                    roles.push(elem.getAttribute('value').valueOf());
                }
            });

            this.user.roleNames = roles;
            this.saving = true;
            this._userService.create(this.user)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
            } else {
                this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
            }
    }
    initializeValues() {
        this.active = true;
        this.user = new CreateUserDto();
        this.user.init({ isActive: true });
    }

    validate(): boolean {
        if (this.user.password !== this.validation.confirmPassword) {
            return false;
        }
        return true;
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/users'])
    }
}
