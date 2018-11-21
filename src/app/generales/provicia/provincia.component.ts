import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProvinciaDto, ProvinciaServiceProxy, PagedResultDtoOfProvinciaDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './provincia.component.html',
    animations: [appModuleAnimation()]
})
export class ProvinciaComponent extends PagedListingComponentBase<ProvinciaDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    provincias: ProvinciaDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _provinciaService: ProvinciaServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._provinciaService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfProvinciaDto) => {
                this.provincias = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(provincia: ProvinciaDto): void {
        MessageHelper.confirm(
            'Se eliminará la provincia:' + provincia.nombre,
            '¿Desea borrarlo?',
            () => {
                    this._provinciaService.delete(provincia.id)
                        .subscribe(() => {
                            abp.notify.info('Provincia borrada exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createProvincia(): void {
        this._router.navigate(['/app/generales/provincia/create-provincia'])
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
