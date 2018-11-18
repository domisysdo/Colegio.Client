import { Component, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateRoleComponent } from 'app/roles/create-role/create-role.component';
import { EditRoleComponent } from 'app/roles/edit-role/edit-role.component';
import { finalize } from 'rxjs/operators';
import { MessageHelper } from '@app/shared/MessageHelper';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  templateUrl: './roles.component.html',
  animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> {

  @ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
  @ViewChild('content') editRoleModal: EditRoleComponent;

  roles: RoleDto[] = [];
  filter = '';
  sorting = '';
  totalCount: number;
  selected = [];
  selectedCount = 0;

  constructor(
    private _router: Router,
    private rolesService: RoleServiceProxy,
    injector: Injector
  ) {
    super(injector);
  }

  list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.rolesService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
      .pipe(finalize(() => { finishedCallback() }))
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        this.roles = result.items;
        this.totalCount = result.totalCount;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: RoleDto): void {
    MessageHelper.confirm(
      'Se eliminaran los usuarios relacionados al rol:' + role.displayName,
      '¿Desea borrarlo?',
      () => {
        this.rolesService.delete(role.id)
          .pipe(finalize(() => {
            abp.notify.info('Deleted Role: ' + role.displayName);
            this.refresh();
          }))
          .subscribe(() => { });
        abp.notify.info('Rol borrado exitosamente');
      }
    );
  }

  createRole(): void {
    this._router.navigate(['/app/roles/create-role'])
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
    console.log('Select Event', selected, this.selected);
    this.selected = selected
    this.selectedCount = selected.length;
  }

  onSort(event: any) {
    this.sorting = event.sorts[0].prop + ' ' + event.sorts[0].dir;
    this.getDataPage(0);
  }

  onPageChange(event: any)  {
    this.getDataPage(event.offset);
  }

  deleteMultipleRoles() {
    MessageHelper.confirm(
      'Se eliminaran múltiples roles y sus usuarios relacionados',
      '¿Desea borrarlo?',
      () => {
        this.rolesService.deleteMultipleRoles(this.selected)
          .pipe(finalize(() => {
            this.selected = [];
            this.selectedCount = 0;
            this.refresh();
            abp.notify.info('Roles borrados exitosamente');
          }))
          .subscribe(() => { });
      }
    );
  }
}
