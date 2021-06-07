import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { AppSharedModule } from './app.shared.module';
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";
import { EffectsModule } from "@ngrx/effects";
import { SharedEffects } from "./shared/store/shared.effects";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SharedEffects]),
    AuthModule,
  ],
  providers: [AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
