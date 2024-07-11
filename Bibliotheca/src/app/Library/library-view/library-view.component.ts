import { Component } from '@angular/core';
import { ILibrary } from '../interfaces/ilibrary';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LibraryUsersComponent } from '../library-users/library-users.component';
import { LibraryBookshelvesComponent } from '../library-bookshelves/library-bookshelves.component';

@Component({
  selector: 'app-library-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LibraryUsersComponent,
    LibraryBookshelvesComponent
  ],
  templateUrl: './library-view.component.html',
  styleUrl: './library-view.component.css'
})
export class LibraryViewComponent {
  public library: ILibrary = {id: 0, name: '', createDate: new Date()}
  private subscriptions: Subscription = new Subscription();
  public loadError: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    const libraryId = this.route.snapshot.params['id'];
    this.subscriptions.add(
      this.libraryService.getLibrary(libraryId)
        .subscribe({
          next: (data) => {
            this.library = data;
          },
          error: (error: HttpErrorResponse) => {
            if(error.status === 404) {
              this.loadError = true;
            }
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
