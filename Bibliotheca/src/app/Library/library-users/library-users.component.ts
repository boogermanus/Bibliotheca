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
  constructor(
    private readonly libraryService: LibraryService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const libraryId = this.route.snapshot.params['id'];
    this.libraryUsers = this.libraryService.getLibraryUsers(libraryId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
