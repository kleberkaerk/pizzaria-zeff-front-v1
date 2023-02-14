import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {

  public address = this.formBuilder.group({
    number: ["", [
      Validators.required,
      Validators.maxLength(150)]
    ],
    road: ["", [
      Validators.required,
      Validators.maxLength(150)]
    ],
    district: ["", [
      Validators.required,
      Validators.maxLength(150)]
    ],
    city: ["", [
      Validators.required,
      Validators.maxLength(150)]
    ],
    state: ["", [
      Validators.required,
      Validators.maxLength(150)]
    ]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }
}
