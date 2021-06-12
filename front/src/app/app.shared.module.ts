import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ PreloaderComponent ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule,
    PreloaderComponent
  ]
})
export class AppSharedModule {
}
