import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: async () => await import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: async () => await import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: async () => await import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
