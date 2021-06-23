import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './shared/services/toastr.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ProfileAvatarComponent } from './shared/components/profile-avatar/profile-avatar.component';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './shared/components/logo/logo.component';

@NgModule({
  declarations: [
    PreloaderComponent,
    HeaderComponent,
    MenuComponent,
    ProfileAvatarComponent,
    LogoComponent
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule,
    PreloaderComponent,
    HeaderComponent
  ],
  providers: [
    SnackbarService
  ]
})
export class AppSharedModule {
}
