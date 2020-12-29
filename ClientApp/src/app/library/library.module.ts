import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { ViewLibrariesComponent } from './view-libraries/view-libraries.component';


@NgModule({
  declarations: [ViewLibrariesComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
