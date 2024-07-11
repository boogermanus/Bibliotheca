import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ILibrary } from '../interfaces/ilibrary';
import { Subscription } from 'rxjs';
import { LibraryService } from '../services/library.service';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-library-detail',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './library-detail.component.html',
  styleUrl: './library-detail.component.css'
})
export class LibraryDetailComponent implements OnDestroy {

  @Input()library: ILibrary
  public subscriptions: Subscription = new Subscription()
  @Output()libraryDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get canBeDeleted(): boolean {
    return this.library.libraryBookshelves.length === 0 && this.library.libraryUsers.length === 1;
  }

  constructor(
    private readonly libraryService: LibraryService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public view(): void {
    this.router.navigate(['/library', this.library.id]);
  }

  public delete(): void {
    this.subscriptions.add(
      this.libraryService.deleteLibrary(this.library.id)
        .subscribe({
          next: () => {
            this.libraryDeleted.emit(true);
          }
        })
    );
  }

}
