import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class AppSharedModule { }
