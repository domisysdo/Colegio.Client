import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ProfesorDto, ProfesorServiceProxy, PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-profesor',
    templateUrl: './edit-profesor.component.html'
})
export class EditProfesorComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    profesor: ProfesorDto = new ProfesorDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _profesorService: ProfesorServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._profesorService.get(id)
            .subscribe(
            (result) => {
                this.profesor = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._profesorService.update(this.profesor)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/nomina/profesor'])
    }
}
