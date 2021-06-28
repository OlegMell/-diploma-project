import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../app.shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    SettingsRoutingModule
  ],
  exports: [
    SettingsComponent
  ],
})
export class SettingsModule { }
