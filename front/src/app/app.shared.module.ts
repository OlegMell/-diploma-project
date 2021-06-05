import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

@NgModule({
  declarations: [],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers)
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class AppSharedModule { }
