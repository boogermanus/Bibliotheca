import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplicationUser } from 'src/app/models/iapplication-user';
import { ApplicationUserService } from 'src/app/services/application-user.service';

@Component({
  selector: 'app-view-library-user',
  templateUrl: './view-library-user.component.html',
  styleUrls: ['./view-library-user.component.css']
})
export class ViewLibraryUserComponent implements OnInit {

  @Input()public libraryId: number;
  public users: Observable<IApplicationUser>;

  constructor(private applicationUserService: ApplicationUserService) { }

  ngOnInit(): void {
    this.users = this.applicationUserService.getUsersForLibrary(this.libraryId);
  }

}
