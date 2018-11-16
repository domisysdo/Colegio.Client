import { Component, Injector, ViewChild, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto, PagedResultDto } from 'shared/paged-listing-component-base';
import { RoleServiceProxy, RoleDto, PagedResultDtoOfRoleDto } from 'shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateRoleComponent } from 'app/roles/create-role/create-role.component';
import { EditRoleComponent } from 'app/roles/edit-role/edit-role.component';
import { finalize } from 'rxjs/operators';
import { MessageHelper } from '@app/shared/MessageHelper';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';


declare var $: any;

@Component({
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> implements AfterViewInit  {



  @ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
  @ViewChild('content') editRoleModal: EditRoleComponent;
  @ViewChild('table') table: DatatableComponent;

  roles: RoleDto[] = [];
  filter = '';
  sorting = '';
  actualPage = 0;
  totalCount: number;
  selected = [];

  ngAfterViewInit() {
    this.table.bodyComponent.recalcLayout();
    this.table.recalculateColumns();
    this.table.recalculate();
  }

  constructor(
    private injector: Injector,
    private _router: Router,
    private rolesService: RoleServiceProxy
  ) {
    super(injector);
  }

  @HostListener('window:resize') onResize() {
    this.table.recalculate();
  }

  list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.rolesService.getAllFiltered(this.sorting, request.skipCount, request.maxResultCount, this.filter)
      .pipe(finalize(() => { finishedCallback() }))
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        this.roles = result.items;
        this.totalCount = result.items.length;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: RoleDto): void {
    MessageHelper.confirmar(
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

  // Show Modals
  createRole(): void {
    // this.createRoleModal.show();
    this._router.navigate(['/app/roles/create-role'])
  }

  // editRole(role: RoleDto): void {
  //   this.editRoleModal.show(role.id);
  // }

  goBack(): void {
    this._router.navigate(['/app/dashboard']);
  }

  refreshData(filter: string ): void {

    this.filter = filter;
    this.pageNumber = 0;
    this.isTableLoading = true;
    this.refresh();
  }
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    // this.selected.splice(0, this.selected.length);
    // this.selected.push(...selected);
  }
  onSort(event: any) {
    this.sorting = event.sorts[0].prop + ' ' + event.sorts[0].dir;
    // console.log(this.sorting);
    this.getDataPage(this.pageNumber);
  }

  onPageChange(event: any)  {
    console.log(event.offset);
    this.getDataPage(event.offset);
    this.pageNumber = event.offset;
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
