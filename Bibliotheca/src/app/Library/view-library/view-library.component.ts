import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILibrary } from '../interfaces/ilibrary';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { LibraryUsersComponent } from "../library-users/library-users.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-library',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LibraryUsersComponent
],
  templateUrl: './view-library.component.html',
  styleUrl: './view-library.component.css'
})
export class ViewLibraryComponent implements OnInit, OnDestroy {
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
