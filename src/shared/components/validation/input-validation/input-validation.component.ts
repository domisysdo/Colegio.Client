import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  @Input() input: NgModel

  constructor() { }

  ngOnInit() {
  }

}
