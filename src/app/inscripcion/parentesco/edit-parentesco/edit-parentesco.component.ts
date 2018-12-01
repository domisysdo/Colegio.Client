import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ParentescoDto, ParentescoServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-parentesco',
    templateUrl: './edit-parentesco.component.html'
})
export class EditParentescoComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    parentesco: ParentescoDto = new ParentescoDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _parentescoService: ParentescoServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._parentescoService.get(id)
            .subscribe(
            (result) => {
                this.parentesco = result;
                this.active = true;
            }
        );
    }

    save(): void {

        this.saving = true;
        this._parentescoService.update(this.parentesco)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/parentesco'])
    }
}
