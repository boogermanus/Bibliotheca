import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewLibrariesComponent } from './view-libraries/view-libraries.component';


const routes: Routes = [
  {path: 'mylibraries', component: ViewLibrariesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
