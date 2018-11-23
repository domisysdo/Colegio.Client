import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { SectorDto, SectorServiceProxy, PaisDto, MunicipioDto, MunicipioServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html'
})
export class CreateSectorComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    sector: SectorDto = new SectorDto();
    municipios: MunicipioDto[] = [];

    constructor(
        injector: Injector,
        private _router: Router,
        private _sectorService: SectorServiceProxy,
        private _municipioService: MunicipioServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getMunicipios();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._sectorService.create(this.sector)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
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

    customSearchFn(term: string, item: PaisDto) {
        term = term.toLocaleLowerCase();
        return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.identificador.toLocaleLowerCase() === term;
    }

}
