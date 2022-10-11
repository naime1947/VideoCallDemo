import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { VideoCallComponent } from './video-call/video-call.component';

const routes: Routes = [
  { path: '', component:HomePageComponent},
  { path: 'video-call', component:VideoCallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
