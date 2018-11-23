import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TipoDireccionDto, TipoDireccionServiceProxy, PagedResultDtoOfTipoDireccionDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './tipo-direccion.component.html',
    animations: [appModuleAnimation()]
})
export class TipoDireccionComponent extends PagedListingComponentBase<TipoDireccionDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    tipoDirecciones: TipoDireccionDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _tipoDireccionService: TipoDireccionServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._tipoDireccionService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfTipoDireccionDto) => {
                this.tipoDirecciones = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(tipoDireccion: TipoDireccionDto): void {
        MessageHelper.confirm(
            'Se eliminará el tipo de dirección:' + tipoDireccion.descripcion,
            '¿Desea borrarlo?',
            () => {
                    this._tipoDireccionService.delete(tipoDireccion.id)
                        .subscribe(() => {
                            abp.notify.info('Tipo de dirección borrada exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createTipoDireccion(): void {
        this._router.navigate(['/app/generales/tipo-direccion/create-tipo-direccion'])
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
