import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './ngb-formatter';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  styleUrls: ['./input-date-component.css']

})
export class InputDateComponent implements OnInit {
  private _date: string | null;

  @Input() tittle: string;
  @Input()
  set date(value: string | null) {
    if (this._date !== value) {
      this._date = value;
      this.updateDate();

    }
  }
  get date(): string | null {
    return this._date;
  }

  @Input() autocomplete: string;
  @Input() container: string;
  @Output() change = new EventEmitter();

  public mostrarTitulo = true;
  public validDate = true;
  public model: NgbDateStruct;

  ngbDateParserFormatter = new NgbDateFRParserFormatter();

  ngOnInit() {

    if (this.container === undefined) {
      this.container = 'body';
    }

    if (this.container === 'modal') {
      this.container = undefined;
    }

    if (this.autocomplete === undefined) {
      this.autocomplete = 'off';
    }
  }

  public setDate(emitt: boolean): void {

    if (!this.validate()) {
      this._date = null;
    } else {
      this._date = this.getDate();
    }

    if (emitt) {
      this.change.emit(this.date);
    }
  }

  private getDate(): string | null {
    if (!this.isDate(this.model)) {
      return null;
    }
    return new Date(this.model.day, this.model.month - 1, this.model.year).toDateString();
  }

  private updateDate(): void {
    if (this.date != null) {
      this.model = this.convertValueToDate(new Date(this.date));
    } else {
      this.model = null;
    }
  }

  public validate(): boolean {
    this.validDate = this.isDate(this.model);
    return this.validDate;
  }

  private convertValueToDate(fecha: Date): NgbDateStruct {
    const date = <NgbDateStruct>{
      day: fecha.getDate(),
      month: fecha.getMonth() + 1,
      year: fecha.getFullYear(),
    };
    return this.ngbDateParserFormatter.parse(date.day + '-' + date.month + '-' + date.year);


  }

  public isDate(argument: any): argument is NgbDateStruct {
    if (argument === null || argument === undefined) {
      return false;
    }

    if (argument.year !== undefined) {
      if (argument.year.toString().length < 4) {
        return false;
      }
    }

    return argument.year !== undefined;
  }
}
