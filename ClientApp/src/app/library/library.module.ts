import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { ViewLibrariesComponent } from './view-libraries/view-libraries.component';
import { LibraryService } from './services/library.service';
import { MaterialModule } from '../material.module';
import { AddLibraryModalComponent } from '../library/add-library-modal/add-library-modal.component';


@NgModule({
  declarations: [ViewLibrariesComponent, AddLibraryModalComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MaterialModule
  ],
  providers: [LibraryService],
  entryComponents: [AddLibraryModalComponent]
})
export class LibraryModule { }
