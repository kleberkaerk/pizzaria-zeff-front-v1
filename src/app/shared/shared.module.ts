import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { AddAddressComponent } from './add-address/add-address.component';

@NgModule({
  declarations: [
    FooterComponent,
    AddAddressComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent
  ]
})
export class SharedModule { }
