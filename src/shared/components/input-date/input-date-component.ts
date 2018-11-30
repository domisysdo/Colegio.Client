import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsLocaleService, defineLocale, esDoLocale, isDate, isDateValid } from 'ngx-bootstrap';
defineLocale('es', esDoLocale);

// import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
// import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { NgbDateFRParserFormatter } from './ngb-formatter';
// import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';
// import * as moment from 'moment';

// @Component({
//   selector: 'app-input-date',
//   templateUrl: './input-date.component.html',
//   providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
// })
// export class InputDateComponent implements OnInit {
//   private _date: Date | null;

//   @Input() tittle: string;
//   @Input()
//   set date(value: Date | null) {
//     if (this._date !== value) {
//       this._date = value;
//       this.updateDate();

//     }
//   }
//   get date(): Date | null {
//     return this._date;
//   }

//   @Input() autocomplete: string;
//   @Output() change = new EventEmitter();

//   public mostrarTitulo = true;
//   public validDate = true;
//   public model: NgbDateStruct;

//   ngbDateParserFormatter = new NgbDateFRParserFormatter();
//   mask =  MascarasConstantes;

//   ngOnInit() {

//   }

//   public setDate(emitt: boolean): void {
//     if (!this.validate()) {
//       this._date = null;
//     } else {
//       this._date = this.getDate();
//     }

//     if (emitt) {
//       this.change.emit(this.date);
//     }
//   }

//   private getDate(): Date | null {
//     if (!this.isDate(this.model)) {
//       return null;
//     }
//     const da = moment(this.model);
//     return da.toDate(); // Date(this.model.year, this.model.month - 1, this.model.day);
//   }

//   private updateDate(): void {
//     if (this.date != null) {
//       this.model = this.convertValueToDate(this.date);
//     } else {
//       this.model = null;
//     }
//   }

//   public validate(): boolean {
//     this.validDate = this.isDate(this.model);
//     return this.validDate;
//   }

//   private convertValueToDate(fecha: Date): NgbDateStruct {
//     const newFecha = moment(fecha).toDate();

//     const date = <NgbDateStruct>{
//       day: newFecha.getDate(),
//       month: newFecha.getMonth() + 1,
//       year: newFecha.getFullYear(),
//     };
//     return date; // this.ngbDateParserFormatter.parse(date.year + '-' +  date.month + '-' + date.day);
//   }

//   public isDate(argument: any): argument is NgbDateStruct {
//     if (argument === null || argument === undefined) {
//       return false;
//     }

//     if (argument.year !== undefined) {
//       if (argument.year.toString().length < 4) {
//         return false;
//       }
//     }

//     return argument.year !== undefined;
//   }
// }


@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html'
})
export class InputDateComponent implements OnInit {
  private _date: Date | null;

  @Input() tittle: string;
  @Output() change = new EventEmitter();
  @Input()
  set date(value: Date | null) {
    if (this._date !== value) {
      this._date = value;
      // this.updateDate();
    }
  }
  public model: Date;

  constructor(
    private localeService: BsLocaleService
  ) {
    this.localeService.use('es')
  }

  get date(): Date | null {
    return this._date;
  }

  private updateDate(): void {
    if (this.date != null) {
      this.model = this.date;
    } else {
      this.model = null;
    }
  }

  ngOnInit(): void {

  }

  public setDate(date): void {
    // this._date = this.model;

    console.log(date);
    if (isDateValid(date)) {
      this.change.emit(date);
    } {
      this.change.emit(null);
    }
  }
}
