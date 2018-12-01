import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { EstudianteDto, EstudianteServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-estudiante',
    templateUrl: './edit-estudiante.component.html'
})
export class EditEstudianteComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    estudiante: EstudianteDto = new EstudianteDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._estudianteService.get(id)
            .subscribe(
            (result) => {
                this.estudiante = result;
                this.active = true;
            }
        );
    }

    save(): void {

        this.saving = true;
        this._estudianteService.update(this.estudiante)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/estudiante'])
    }
}
