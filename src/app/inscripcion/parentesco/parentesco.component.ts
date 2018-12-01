import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ParentescoDto, ParentescoServiceProxy, PagedResultDtoOfParentescoDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './parentesco.component.html',
    animations: [appModuleAnimation()]
})
export class ParentescoComponent extends PagedListingComponentBase<ParentescoDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    parentescos: ParentescoDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _parentescoService: ParentescoServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._parentescoService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfParentescoDto) => {
                this.parentescos = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(parentesco: ParentescoDto): void {
        MessageHelper.confirm(
            'Se eliminará el país:' + parentesco.descripcion,
            '¿Desea borrarlo?',
            () => {
                    this._parentescoService.delete(parentesco.id)
                        .subscribe(() => {
                            abp.notify.info('Parentesco borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createParentesco(): void {
        this._router.navigate(['/app/inscripcion/parentesco/create-parentesco'])
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
