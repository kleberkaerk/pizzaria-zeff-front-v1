import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressesComponent } from './addresses/addresses.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddressesComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    SharedModule
  ]
})
export class AddressModule { }
