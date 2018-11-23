import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { SectorDto, SectorServiceProxy, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-sector',
    templateUrl: './edit-sector.component.html'
})
export class EditSectorComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    sector: SectorDto = new SectorDto();
    municipios: MunicipioDto[] = [];


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _sectorService: SectorServiceProxy,
        private _municipioService: MunicipioServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getMunicipios();

        this._sectorService.get(id)
            .subscribe(
            (result) => {
                this.sector = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._sectorService.update(this.sector)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    getMunicipios() {
        this._municipioService.getAllForSelect()
        .subscribe((result: MunicipioDto[]) => {
            this.municipios = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/sector'])
    }
}
