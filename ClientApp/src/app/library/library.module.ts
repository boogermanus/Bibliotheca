import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { ViewLibrariesComponent } from './view-libraries/view-libraries.component';
import { LibraryService } from './services/library.service';
import { MaterialModule } from '../material.module';
import { AddLibraryModalComponent } from '../library/add-library-modal/add-library-modal.component';
import { FormsModule } from '@angular/forms';
import { ViewLibraryComponent } from './view-library/view-library.component';
import { ViewLibraryUserComponent } from './view-library-user/view-library-user.component';


@NgModule({
  declarations: [ViewLibrariesComponent, AddLibraryModalComponent, ViewLibraryComponent, ViewLibraryUserComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [LibraryService],
  entryComponents: [AddLibraryModalComponent]
})
export class LibraryModule { }
