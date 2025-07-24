import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'app-nav-menu',
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './nav-menu.component.html',
    styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {

  }

  public loginOrRegister(): void {
    this.router.navigate(['login']);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public libraries(): void {
    this.router.navigate(['/libraries'])
  }

  public books(): void {
    this.router.navigate(['/books']);
  }

}
