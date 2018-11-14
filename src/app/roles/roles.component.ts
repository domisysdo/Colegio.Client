import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto, PagedResultDto } from 'shared/paged-listing-component-base';
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
  styleUrls: ['./roles.component.css'],
  animations: [appModuleAnimation()]
})
export class RolesComponent extends PagedListingComponentBase<RoleDto> implements OnInit  {


  @ViewChild('createRoleModal') createRoleModal: CreateRoleComponent;
  @ViewChild('content') editRoleModal: EditRoleComponent;

  roles: RoleDto[] = [];
  filter = '';
  totalCount: number;
  selected = [];

  rows: any [] = [];
  constructor(
    private injector: Injector,
    private _router: Router,
    private rolesService: RoleServiceProxy
  ) {
    super(injector);



  }

  list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.rolesService.getAllFiltered(request.skipCount, request.maxResultCount, this.filter)
      .pipe(finalize(() => { finishedCallback() }))
      .subscribe((result: PagedResultDtoOfRoleDto) => {
        this.roles = result.items;

        // result.items.forEach(function (value) {
        //   this.rows.push(value);
        //   console.log(value);
        // });

        // console.log(this.rows);
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

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
