import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProfesorDto, ProfesorServiceProxy, PagedResultDtoOfProfesorDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './profesor.component.html',
    animations: [appModuleAnimation()]
})
export class ProfesorComponent extends PagedListingComponentBase<ProfesorDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    profesores: ProfesorDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _profesorService: ProfesorServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._profesorService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfProfesorDto) => {
                this.profesores = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(profesor: ProfesorDto): void {
        MessageHelper.confirm(
            'Se eliminará el profesor:' + profesor.nombres,
            '¿Desea borrarlo?',
            () => {
                    this._profesorService.delete(profesor.id)
                        .subscribe(() => {
                            abp.notify.info('Profesor borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createProfesor(): void {
        this._router.navigate(['/app/nomina/profesor/create-profesor'])
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
