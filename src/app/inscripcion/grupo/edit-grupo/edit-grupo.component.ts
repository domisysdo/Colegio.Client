import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { GrupoDto, GrupoServiceProxy, MateriaDto, MateriaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-grupo',
    templateUrl: './edit-grupo.component.html'
})
export class EditGrupoComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    grupo: GrupoDto = new GrupoDto();
    materias: MateriaDto[] = [];


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _grupoService: GrupoServiceProxy,
        private _materiaService: MateriaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getMaterias();

        this._grupoService.get(id)
            .subscribe(
            (result) => {
                this.grupo = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._grupoService.update(this.grupo)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    getMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/grupo'])
    }
}
