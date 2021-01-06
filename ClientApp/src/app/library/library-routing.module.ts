import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewLibrariesComponent } from './view-libraries/view-libraries.component';
import {ViewLibraryComponent} from "./view-library/view-library.component";


const routes: Routes = [
  {path: 'mylibraries', component: ViewLibrariesComponent},
  {path: 'library/:id', component: ViewLibraryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
