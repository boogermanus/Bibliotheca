import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILibrary } from '../models/ilibrary';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-view-libraries',
  templateUrl: './view-libraries.component.html',
  styleUrls: ['./view-libraries.component.css']
})
export class ViewLibrariesComponent implements OnInit {

  libraries: Observable<ILibrary[]>;
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraries = this.libraryService.getAll();
  }

}
