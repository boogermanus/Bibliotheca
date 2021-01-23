import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthorizeService, IUser } from 'src/api-authorization/authorize.service';
import { IApplicationUser } from 'src/app/models/iapplication-user';
import { ApplicationUserService } from 'src/app/services/application-user.service';

@Component({
  selector: 'app-view-library-user',
  templateUrl: './view-library-user.component.html',
  styleUrls: ['./view-library-user.component.css']
})
export class ViewLibraryUserComponent implements OnInit, OnDestroy {

  @Input()public libraryId: number;
  public users: Observable<IApplicationUser>;
  public currentUser: IUser;
  public subscriptions: Subscription = new Subscription();

  constructor(private applicationUserService: ApplicationUserService,
              private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.users = this.applicationUserService.getUsersForLibrary(this.libraryId);
    this.subscriptions.add(this.authorizeService.getUser().subscribe(user => this.currentUser = user));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
