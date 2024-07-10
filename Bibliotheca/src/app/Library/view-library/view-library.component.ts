import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ILibrary } from '../interfaces/ilibrary';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-library',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './view-library.component.html',
  styleUrl: './view-library.component.css'
})
export class ViewLibraryComponent implements OnInit, OnDestroy {
  @Input()library: ILibrary
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    const libraryId = this.route.snapshot.params['id'];
    this.subscriptions.add(
      this.libraryService.getLibrary(libraryId)
        .subscribe({
          next: (data) => {
            this.library = data;
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
