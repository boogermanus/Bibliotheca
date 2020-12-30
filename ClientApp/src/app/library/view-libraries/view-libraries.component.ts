import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddLibraryModalComponent } from '../add-library-modal/add-library-modal.component';
import { ILibrary } from '../models/ilibrary';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-view-libraries',
  templateUrl: './view-libraries.component.html',
  styleUrls: ['./view-libraries.component.css']
})
export class ViewLibrariesComponent implements OnInit {

  libraries: Observable<ILibrary[]>;
  constructor(private libraryService: LibraryService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.libraries = this.libraryService.getAll();
  }

  public openAddDialog(): void {
    this.dialog.open(AddLibraryModalComponent);

  }

}
