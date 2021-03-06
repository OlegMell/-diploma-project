import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { AppSharedModule } from './app.shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './shared/store/shared.effects';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainModule } from './modules/main/main.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsModule } from './modules/settings/settings.module';
import { NgAudioRecorderModule } from 'ng-audio-recorder';

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
    NgAudioRecorderModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false, // для иммутабельности состояния (лайки)
        strictActionImmutability: false, // для иммутабельности состояния (лайки)
      },
    }),
    EffectsModule.forRoot([SharedEffects]),
    AuthModule,
    ProfileModule,
    MainModule,
    SettingsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
