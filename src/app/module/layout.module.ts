import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MaterialModule} from './material/material.module';
import {SpinnerComponent} from "./spinner/spinner.component";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent
  ],
})
export class LayoutModule {
}