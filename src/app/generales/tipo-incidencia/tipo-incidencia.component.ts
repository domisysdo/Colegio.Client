import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TipoIncidenciaDto, TipoIncidenciaServiceProxy,
         PagedResultDtoOfTipoIncidenciaDto, EstadoIncidenciaDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './tipo-incidencia.component.html',
    animations: [appModuleAnimation()]
})
export class TipoIncidenciaComponent extends PagedListingComponentBase<TipoIncidenciaDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    tipoIncidencias: TipoIncidenciaDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;


    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoIncidenciaService: TipoIncidenciaServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._tipoIncidenciaService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfTipoIncidenciaDto) => {
                this.tipoIncidencias = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(tipoIncidencia: TipoIncidenciaDto): void {
        MessageHelper.confirm(
            'Se eliminará el tipo de incidencia:' + tipoIncidencia.descripcion,
            '¿Desea borrarlo?',
            () => {
                    this._tipoIncidenciaService.delete(tipoIncidencia.id)
                        .subscribe(() => {
                            abp.notify.info('Tipo de incidencia borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createTipoIncidencia(): void {
        this._router.navigate(['/app/generales/tipo-incidencia/create-tipo-incidencia'])
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
}
