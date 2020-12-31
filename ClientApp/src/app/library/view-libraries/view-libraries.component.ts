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

  // libraries: ILibrary[] = [];
  libraries: Observable<ILibrary[]>;
  subscriptions: Subscription = new Subscription();
  constructor(private libraryService: LibraryService,
              public dialog: MatDialog) { }

  public ngOnInit(): void {
      // this.libraryService.getAll().subscribe(libraries => this.libraries = libraries);
      this.libraries = this.libraryService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddLibraryModalComponent, {data: {name: ''}});

    const sub = dialogRef.afterClosed().subscribe(name => {
      const innerSub = this.libraryService
        .add(name)
        .subscribe(() => {
          this.libraries = this.libraryService.getAll();
        });
      this.subscriptions.add(innerSub);
    });

    this.subscriptions.add(sub);
  }

}
