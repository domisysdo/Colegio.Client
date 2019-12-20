import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { AulaDto, AulaServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-aula',
    templateUrl: './edit-aula.component.html'
})
export class EditAulaComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    aula: AulaDto = new AulaDto();

    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _aulaService: AulaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._aulaService.get(id)
            .subscribe(
            (result) => {
                this.aula = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._aulaService.update(this.aula)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/aula'])
    }
}
