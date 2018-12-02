import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { NacionalidadDto, NacionalidadServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-nacionalidad',
    templateUrl: './edit-nacionalidad.component.html'
})
export class EditNacionalidadComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    nacionalidad: NacionalidadDto = new NacionalidadDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _nacionalidadService: NacionalidadServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._nacionalidadService.get(id)
            .subscribe(
            (result) => {
                this.nacionalidad = result;
                this.active = true;
            }
        );
    }

    save(): void {

        this.saving = true;
        this._nacionalidadService.update(this.nacionalidad)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/nacionalidad'])
    }
}
