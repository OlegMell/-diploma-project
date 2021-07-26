import { NgModule } from '@angular/core';
import { AppSharedModule } from '../../app.shared.module';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { PostCreatorComponent } from './components/post-creator/post-creator.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/posts.effects';


@NgModule({
  declarations: [
    MainComponent,
    PostCreatorComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    AppSharedModule,
    MainRoutingModule,
    PickerModule,
    EffectsModule.forFeature([ PostsEffects ])
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
