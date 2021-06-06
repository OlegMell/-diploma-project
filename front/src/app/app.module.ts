import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { AppSharedModule } from './app.shared.module';
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSharedModule,
    StoreModule.forRoot(reducers),
    AuthModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
