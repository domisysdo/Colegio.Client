import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-pais',
    templateUrl: './edit-pais.component.html'
})
export class EditPaisComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    pais: PaisDto = new PaisDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _paisService: PaisServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._paisService.get(id)
            .subscribe(
            (result) => {
                this.pais = result;
                this.active = true;
            }
        );
    }

    save(): void {

        this.saving = true;
        this._paisService.update(this.pais)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/pais'])
    }
}
