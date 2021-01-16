import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-library-user',
  templateUrl: './view-library-user.component.html',
  styleUrls: ['./view-library-user.component.css']
})
export class ViewLibraryUserComponent implements OnInit {

  @Input()libraryId: number;
  constructor() { }

  ngOnInit(): void {
  }

}
