import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PeriodoDto, PeriodoServiceProxy, PagedResultDtoOfPeriodoDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './periodo.component.html',
    animations: [appModuleAnimation()]
})
export class PeriodoComponent extends PagedListingComponentBase<PeriodoDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    periodos: PeriodoDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _periodoService: PeriodoServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._periodoService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfPeriodoDto) => {
                this.periodos = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(periodo: PeriodoDto): void {
        MessageHelper.confirm(
            'Se eliminará la periodo:' + periodo.identificador,
            '¿Desea borrarlo?',
            () => {
                    this._periodoService.delete(periodo.id)
                        .subscribe(() => {
                            abp.notify.info('Periodo borrada exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createPeriodo(): void {
        this._router.navigate(['/app/inscripcion/periodo/create-periodo'])
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
