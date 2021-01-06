import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-view-library',
  templateUrl: './view-library.component.html',
  styleUrls: ['./view-library.component.css']
})
export class ViewLibraryComponent implements OnInit {

  public id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
  }

}
