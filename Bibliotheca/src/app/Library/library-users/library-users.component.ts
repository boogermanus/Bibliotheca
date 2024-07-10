import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';
import { Observable, Subscription } from 'rxjs';
import { ILibraryUser } from '../interfaces/ilibrary-user';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-library-users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './library-users.component.html',
  styleUrl: './library-users.component.css'
})
export class LibraryUsersComponent implements OnInit, OnDestroy {
  public libraryUsers: Observable<ILibraryUser[]>
  private subscriptions: Subscription = new Subscription();
  public libraryId: number = 0;
  public hasError: boolean = false;
  public errorMessage: string = '';

  constructor(
    private readonly libraryService: LibraryService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.libraryId = this.route.snapshot.params['id'];
    this.libraryUsers = this.libraryService.getLibraryUsers(this.libraryId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public add(username: string): void {
    this.subscriptions.add(
      this.libraryService.addLibraryUser(username,this.libraryId)
        .subscribe({
          next: () => {
            this.libraryUsers = this.libraryService.getLibraryUsers(this.libraryId);
            this.errorMessage = '';
          },
          error: (error: HttpErrorResponse) => {
            if(error.status == 400 || error.status == 404) {
              this.errorMessage = error.error;
            }
          }
        }
        )
    );
  }

  public delete(libraryUserId: number): void {
    this.subscriptions.add(
      this.libraryService.deleteLibraryUser(libraryUserId)
        .subscribe({
          next:() => {
            this.libraryUsers = this.libraryService.getLibraryUsers(this.libraryId);
          }
        })
    );
  }
}
