import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-table-items-delete',
  templateUrl: './table-items-delete.component.html',
  styleUrls: ['./table-items-delete.component.css']
})
export class TableItemsDeleteComponent implements OnInit {

  @Input() selectedCount: NgModel
  @Output() onClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    if (this.onClickEvent.observers.length > 0) {
      this.onClickEvent.emit(event);
    }
  }
}
