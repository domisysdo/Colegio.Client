import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { EstudianteServiceProxy, EstudianteDto, PagedResultDtoOfEstudianteDto } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { CreateEstudianteComponent } from 'app/estudiante/create-estudiante/create-estudiante.component';
import { EditEstudianteComponent } from 'app/estudiante/edit-estudiante/edit-estudiante.component';
import { finalize } from 'rxjs/operators';
import { MessageHelper } from '@app/shared/MessageHelper';

@Component({
    templateUrl: './estudiante.component.html',
    animations: [appModuleAnimation()]
})
export class EstudiantesComponent extends PagedListingComponentBase<EstudianteDto> {

    @ViewChild('createEstudianteModal') createEstudianteModal: CreateEstudianteComponent;
    @ViewChild('editEstudianteModal') editEstudianteModal: EditEstudianteComponent;

    active = false;
    estudiante: EstudianteDto[] = [];

    constructor(
        injector: Injector,
        private _estudianteService: EstudianteServiceProxy
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._estudianteService.getAll(request.skipCount, request.maxResultCount)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfEstudianteDto) => {
                this.estudiante = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(estudiante: EstudianteDto): void {
        MessageHelper.confirm(
            'Se borrará el estudiante ' + estudiante.nombres + '?',
            '¿Esta seguro?',
            () => {

            this._estudianteService.delete(estudiante.id)
                .subscribe(() => {
                    abp.notify.info('Deleted Estudiante: ' + estudiante.nombres);
                    this.refresh();
                });
            }
        );
    }

    // Show Modals
    createEstudiante(): void {
        this.createEstudianteModal.show();
    }

    editEstudiante(estudiante: EstudianteDto): void {
        this.editEstudianteModal.show(estudiante.id);
    }
}
