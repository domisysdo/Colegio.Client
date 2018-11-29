import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TipoIdentificacionDto, TipoIdentificacionServiceProxy, PagedResultDtoOfTipoIdentificacionDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './tipo-identificacion.component.html',
    animations: [appModuleAnimation()]
})
export class TipoIdentificacionComponent extends PagedListingComponentBase<TipoIdentificacionDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    tipoIdentificacions: TipoIdentificacionDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoIdentificacionService: TipoIdentificacionServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._tipoIdentificacionService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfTipoIdentificacionDto) => {
                this.tipoIdentificacions = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(tipoIdentificacion: TipoIdentificacionDto): void {
        MessageHelper.confirm(
            'Se eliminará el tipo de identificacion:' + tipoIdentificacion.descripcion,
            '¿Desea borrarlo?',
            () => {
                    this._tipoIdentificacionService.delete(tipoIdentificacion.id)
                        .subscribe(() => {
                            abp.notify.info('Tipo de identificacion borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createTipoIdentificacion(): void {
        this._router.navigate(['/app/generales/tipo-identificacion/create-tipo-identificacion'])
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
