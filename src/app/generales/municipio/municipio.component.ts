import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MunicipioDto, MunicipioServiceProxy, PagedResultDtoOfMunicipioDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './municipio.component.html',
    animations: [appModuleAnimation()]
})
export class MunicipioComponent extends PagedListingComponentBase<MunicipioDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    municipios: MunicipioDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _municipioService: MunicipioServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._municipioService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfMunicipioDto) => {
                this.municipios = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(municipio: MunicipioDto): void {
        MessageHelper.confirm(
            'Se eliminará la municipio:' + municipio.nombre,
            '¿Desea borrarlo?',
            () => {
                    this._municipioService.delete(municipio.id)
                        .subscribe(() => {
                            abp.notify.info('Municipio borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createMunicipio(): void {
        this._router.navigate(['/app/generales/municipio/create-municipio'])
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
