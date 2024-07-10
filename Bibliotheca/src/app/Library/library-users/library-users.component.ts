import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ILibrary } from '../interfaces/ilibrary';
import { LibraryService } from '../services/library.service';
import { Observable, Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { ILibraryUser } from '../interfaces/ilibrary-user';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-library-users',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule
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
