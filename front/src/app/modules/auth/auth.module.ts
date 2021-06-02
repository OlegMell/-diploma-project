import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AppSharedModule } from '../../app.shared.module';



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule
  ]
})
export class AuthModule { }
