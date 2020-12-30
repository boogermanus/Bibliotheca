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
export class ViewLibrariesComponent implements OnInit, OnDestroy {

  libraries: Observable<ILibrary[]>;
  subscriptions: Subscription = new Subscription();
  constructor(private libraryService: LibraryService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.libraries = this.libraryService.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddLibraryModalComponent, {data: {name: ''}});

    this.subscriptions.add(dialogRef.afterClosed().subscribe(data => {
      this.libraryService.add(data);
      this.libraries = this.libraryService.getAll();
    }));
  }

}
