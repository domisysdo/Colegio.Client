import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit {

  constructor() { }

  @Input() input: NgModel

  ngOnInit() {
  }

}
