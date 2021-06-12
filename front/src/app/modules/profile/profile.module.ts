import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../app.shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ProfileRoutingModule,
  ],
  exports: [
    ProfileComponent
  ],
})
export class ProfileModule { }
