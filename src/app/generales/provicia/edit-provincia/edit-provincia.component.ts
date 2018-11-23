import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ProvinciaDto, ProvinciaServiceProxy, PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-provincia',
    templateUrl: './edit-provincia.component.html'
})
export class EditProvinciaComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    provincia: ProvinciaDto = new ProvinciaDto();
    paises: PaisDto[] = [];


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _provinciaService: ProvinciaServiceProxy,
        private _paisService: PaisServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getPaises();

        this._provinciaService.get(id)
            .subscribe(
            (result) => {
                this.provincia = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._provinciaService.update(this.provincia)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    getPaises() {
        this._paisService.getAllForSelect()
        .subscribe((result: PaisDto[]) => {
            this.paises = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/provincia'])
    }
}
