import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { MunicipioDto, MunicipioServiceProxy, PaisDto, ProvinciaDto, ProvinciaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-municipio',
  templateUrl: './create-municipio.component.html'
})
export class CreateMunicipioComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    municipio: MunicipioDto = new MunicipioDto();
    provincias: ProvinciaDto[] = [];

    constructor(
        injector: Injector,
        private _router: Router,
        private _municipioService: MunicipioServiceProxy,
        private _provinciaService: ProvinciaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getProvincias();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._municipioService.create(this.municipio)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
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

    customSearchFn(term: string, item: PaisDto) {
        term = term.toLocaleLowerCase();
        return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.identificador.toLocaleLowerCase() === term;
    }

}
