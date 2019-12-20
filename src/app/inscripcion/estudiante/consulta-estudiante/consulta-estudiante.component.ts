import { Component, Injector, Input } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EstudianteDto, EstudianteServiceProxy, PagedResultDtoOfEstudianteDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';

@Component({
    selector: 'app-consulta-estudiante',
    templateUrl: './consulta-estudiante.component.html',
    animations: [appModuleAnimation()]
})
export class ConsultaEstudianteComponent extends PagedListingComponentBase<EstudianteDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    estudiante: EstudianteDto = new EstudianteDto();
    estudiantees: EstudianteDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selectedCount = 0;
    modal: NgbModalRef;

    @Input() selected: EstudianteDto[] = [];

    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy,
        private modalHelper: ModalHelper

    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._estudianteService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfEstudianteDto) => {
                this.estudiantees = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(): void {
    }

    goBack(): void {
        this._router.navigate(['/app/dashboard']);
    }

    searchData(filter: string ): void {

        this.filter = filter;
        this.pageNumber = 0;
        this.isTableLoading = true;
        this.refresh();
    }

    onSelect({ selected }) {
        this.selected = selected
        this.selectedCount = selected.length;
        this.ngxDatatableHelper.selectedCountMessages(this.selectedCount);
    }

    onSort(event: any) {
        this.sorting = event.sorts[0].prop + ' ' + event.sorts[0].dir;
        this.getDataPage(0);
    }

    onPageChange(event: any)  {
        this.getDataPage(event.offset);
    }

    abrirConsulta(content) {
        this.modal = this.modalHelper.getLargeModal(content);
    }

    seleccionarEstudiante() {
        if (this.estudiante.estado === 0) {
            MessageHelper.show('El estudiante está inactivo', 'Inactivo')
            return;
        }

        if (this.selected.length === 0) {
            MessageHelper.show('Debe seleccionar un estudiante', 'Seleccione');
            return;
        } else if (this.selected.length > 1) {
            MessageHelper.show('Ha seleccionado más de un estudiante', 'Verifique');
            return;
        } else {
            this.estudiante = this.selected[0];
        }
        this.modal.close();
    }
}
