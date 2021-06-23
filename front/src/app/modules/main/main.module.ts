import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../app.shared.module';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    AppSharedModule,
    MainRoutingModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {}
