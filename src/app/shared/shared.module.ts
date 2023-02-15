import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FunctionalityUnderDevelopmentComponent } from './functionality-under-development/functionality-under-development.component';

@NgModule({
  declarations: [
    FooterComponent,
    FunctionalityUnderDevelopmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    FunctionalityUnderDevelopmentComponent
  ]
})
export class SharedModule { }
