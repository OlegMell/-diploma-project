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
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { EditProfileDialogComponent } from './shared/components/edit-profile-dialog/edit-profile-dialog.component';
import { InViewportDirective } from './shared/directives/in-viewport.directive';
import { SmallUserComponent } from './shared/components/small-user/small-user.component';
import { WritePostBtnComponent } from './shared/components/write-post-btn/write-post-btn.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    MenuComponent,
    LogoComponent,
    HeaderComponent,
    SearchbarComponent,
    PreloaderComponent,
    SmallUserComponent,
    InViewportDirective,
    WritePostBtnComponent,
    ProfileAvatarComponent,
    EditProfileDialogComponent,
  ],
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    PickerModule
  ],
  exports: [
    AppMaterialModule,
    ReactiveFormsModule,
    PreloaderComponent,
    HeaderComponent,
    WritePostBtnComponent,
    InViewportDirective,
    SmallUserComponent
  ],
  entryComponents: [
    EditProfileDialogComponent
  ],
  providers: [
    SnackbarService
  ]
})
export class AppSharedModule {
}
