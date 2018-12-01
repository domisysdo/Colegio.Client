import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { ProfesorDto, ProfesorServiceProxy, PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-profesor',
  templateUrl: './create-profesor.component.html'
})
export class CreateProfesorComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    profesor: ProfesorDto = new ProfesorDto();
    constructor(
        injector: Injector,
        private _router: Router,
        private _profesorService: ProfesorServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._profesorService.create(this.profesor)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/nomina/profesor'])
    }

    customSearchFn(term: string, item: PaisDto) {
        term = term.toLocaleLowerCase();
        return item.nombre.toLocaleLowerCase().indexOf(term) > -1 || item.identificador.toLocaleLowerCase() === term;
    }

}
