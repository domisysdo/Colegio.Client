import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { PagoDto, PagoServiceProxy,  
         EstudianteDto, EstudianteServiceProxy, CuotaDto, CuotaServiceProxy, PagoDetalleDto
       } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html'
})
export class PagoComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    saving = false;
    estudiantes: EstudianteDto[] = [];
    estudiante: EstudianteDto = new EstudianteDto;
    cuotas: CuotaDto[] = [];
    today: number = Date.now();
    pago: PagoDto = new PagoDto;
    montoTotal = 0;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _pagoService: PagoServiceProxy,
        private _estudianteService: EstudianteServiceProxy,
        private _cuotaService: CuotaServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getEstudiantes();
    }

    save(form: NgForm): void {
        console.log('entro');
        console.log('form');
        if (form.valid) {

            this.saving = true;
            this._pagoService.create(this.pago)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.pago = new PagoDto();
                    this.estudiante = new EstudianteDto;
                    this.getEstudiantes();
                    this.cuotas = [];

    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    getEstudiantes() {
        this._estudianteService.getAllForSelect()
        .subscribe((result: EstudianteDto[]) => {
            this.estudiantes = result;
        });
    }

    onEstudianteChanged(event: any) {
        this._estudianteService.getIncluding(event.id)
        .subscribe((result: EstudianteDto) => {
            this.estudiante = result;
        });

        this._cuotaService.getCuotasPendiente(this.estudiante.id)
        .subscribe((result: CuotaDto[]) => {
            this.cuotas = result;
        });
    }

    onSelect({ selected }) {
        this.pago.pagoDetalle = [];
        this.montoTotal = 0;
        this.selected = selected
        this.selectedCount = selected.length;
        selected.forEach(element => {
            let cuota: CuotaDto = this.cuotas.find(x => x.id = element.id);
            this.montoTotal += cuota.balance + cuota.montoMora;
            
            this.pago.inscripcionId = cuota.inscripcionId;
            console.log(cuota.inscripcionId);
            let pagoDetalle: PagoDetalleDto = new PagoDetalleDto;
            pagoDetalle.cuotaId = cuota.id;
            pagoDetalle.montoMoraPago = cuota.montoMoraPendiente;
            pagoDetalle.montoPago = cuota.balance;
            this.pago.pagoDetalle.push(pagoDetalle.clone());

        });

    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/pago/pago'])
    }

}
