import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { MunicipioDto, MunicipioServiceProxy, ProvinciaDto, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-municipio',
    templateUrl: './edit-municipio.component.html'
})
export class EditMunicipioComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    municipio: MunicipioDto = new MunicipioDto();
    provincias: ProvinciaDto[] = [];


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _municipioService: MunicipioServiceProxy,
        private _provinciaService: ProvinciaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getProvincias();

        this._municipioService.get(id)
            .subscribe(
            (result) => {
                this.municipio = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._municipioService.update(this.municipio)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    getProvincias() {
        this._provinciaService.getAllForSelect()
        .subscribe((result: ProvinciaDto[]) => {
            this.provincias = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/municipio'])
    }
}
