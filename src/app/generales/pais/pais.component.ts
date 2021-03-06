import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PaisDto, PaisServiceProxy, PagedResultDtoOfPaisDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './pais.component.html',
    animations: [appModuleAnimation()]
})
export class PaisComponent extends PagedListingComponentBase<PaisDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    paises: PaisDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _paisService: PaisServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._paisService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfPaisDto) => {
                this.paises = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(pais: PaisDto): void {
        MessageHelper.confirm(
            'Se eliminará el país:' + pais.nombre,
            '¿Desea borrarlo?',
            () => {
                    this._paisService.delete(pais.id)
                        .subscribe(() => {
                            abp.notify.info('País borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createPais(): void {
        this._router.navigate(['/app/generales/pais/create-pais'])
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
