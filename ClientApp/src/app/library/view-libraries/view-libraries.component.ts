import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AddLibraryModalComponent } from '../add-library-modal/add-library-modal.component';
import { ILibrary } from '../models/ilibrary';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-view-libraries',
  templateUrl: './view-libraries.component.html',
  styleUrls: ['./view-libraries.component.css']
})
export class ViewLibrariesComponent implements OnInit {

  libraries: ILibrary[] = [];
  // subscriptions: Subscription;
  constructor(private libraryService: LibraryService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
      this.libraryService.getAll().subscribe(libraries => this.libraries = libraries);
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddLibraryModalComponent, {data: {name: ''}});

    dialogRef.afterClosed().subscribe(name => {
      this.libraryService.add(name).subscribe(newLibrary => this.libraries.push(newLibrary));
    });
  }

}
