import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {LibraryService} from "../services/library.service";
import {Observable} from "rxjs";
import {ILibrary} from "../models/ilibrary";

@Component({
  selector: 'app-view-library',
  templateUrl: './view-library.component.html',
  styleUrls: ['./view-library.component.css']
})
export class ViewLibraryComponent implements OnInit {

  public id: number;
  public library: Observable<ILibrary>;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    this.library = this.libraryService.get(this.id);
  }

}
