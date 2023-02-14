import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FunctionalityUnderDevelopmentComponent } from './functionality-under-development/functionality-under-development.component';

@NgModule({
  declarations: [
    FooterComponent,
    AddAddressComponent,
    FunctionalityUnderDevelopmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    AddAddressComponent,
    FunctionalityUnderDevelopmentComponent
  ]
})
export class SharedModule { }
