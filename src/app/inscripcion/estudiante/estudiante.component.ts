import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EstudianteDto, EstudianteServiceProxy, PagedResultDtoOfEstudianteDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
    templateUrl: './estudiante.component.html',
    animations: [appModuleAnimation()]
})
export class EstudianteComponent extends PagedListingComponentBase<EstudianteDto> {

    ngxDatatableHelper = NgxDatatableHelper;

    active = false;
    estudiantees: EstudianteDto[] = [];
    filter = '';
    sorting = '';
    totalCount: number;
    selected = [];
    selectedCount = 0;

    constructor(
        injector: Injector,
        private _router: Router,
        private _estudianteService: EstudianteServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._estudianteService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfEstudianteDto) => {
                this.estudiantees = result.items;
                this.totalCount = result.items.length;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(estudiante: EstudianteDto): void {
        MessageHelper.confirm(
            'Se eliminará el país:' + estudiante.nombres,
            '¿Desea borrarlo?',
            () => {
                    this._estudianteService.delete(estudiante.id)
                        .subscribe(() => {
                            abp.notify.info('País borrado exitosamente');
                            this.refresh();
                        });
                }
        );
    }

    createEstudiante(): void {
        this._router.navigate(['/app/inscripcion/estudiante/create-estudiante'])
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
