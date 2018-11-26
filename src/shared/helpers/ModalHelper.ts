﻿import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalHelper {

  constructor(private modalService: NgbModal) { }

  public getSmallModal(content: any): NgbModalRef {
    return this.modalService.open(content, { size: 'sm', backdrop: 'static', centered: true });
  }

  public getMediumModal(content: any): NgbModalRef {
    return this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  public getLargeModal(content: any): NgbModalRef {
    return this.modalService.open(content, { size: 'lg', backdrop: 'static', centered: true });
  }
}
