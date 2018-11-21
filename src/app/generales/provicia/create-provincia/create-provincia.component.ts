import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { ProvinciaDto, ProvinciaServiceProxy, PaisDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-provincia',
  templateUrl: './create-provincia.component.html'
})
export class CreateProvinciaComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    provincia: ProvinciaDto = new ProvinciaDto();
    paises: PaisDto[] = [];
    paisId = 0;
    constructor(
        injector: Injector,
        private _router: Router,
        private _provinciaService: ProvinciaServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getPaises();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._provinciaService.create(this.provincia)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }
    getPaises() {
        this._provinciaService.getAllPaises()
        .subscribe((result: PaisDto[]) => {
            this.paises = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/provincia'])
    }

    customSearchFn(term: string, item: PaisDto) {
        term = term.toLocaleLowerCase();
        return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.identificador.toLocaleLowerCase() === term;
    }

}
