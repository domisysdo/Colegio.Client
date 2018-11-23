import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TipoTelefonoDto, TipoTelefonoServiceProxy, PagedResultDtoOfTipoTelefonoDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './tipo-telefono.component.html',
    animations: [appModuleAnimation()]
})
export class TipoTelefonoComponent extends PagedListingComponentBase<TipoTelefonoDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    tipoTelefonos: TipoTelefonoDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoTelefonoService: TipoTelefonoServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._tipoTelefonoService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfTipoTelefonoDto) => {
                this.tipoTelefonos = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(tipoTelefono: TipoTelefonoDto): void {
        MessageHelper.confirm(
            'Se eliminará el tipo de teléfono:' + tipoTelefono.descripcion,
            '¿Desea borrarlo?',
            () => {
                    this._tipoTelefonoService.delete(tipoTelefono.id)
                        .subscribe(() => {
                            abp.notify.info('Tipo de teléfono borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createTipoTelefono(): void {
        this._router.navigate(['/app/generales/tipo-telefono/create-tipo-telefono'])
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
