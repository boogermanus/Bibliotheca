import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadComponent: () => import('./auth/login/login.component').then(r => r.LoginComponent)},
  {path: 'register', loadComponent: () => import('./auth/register/register.component').then(r => r.RegisterComponent)},
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(r => r.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'libraries',
    loadComponent: () => import('./library/libraries/libraries.component').then(r => r.LibrariesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'library/:id',
    loadComponent: () => import('./library/library-detail/library-detail.component').then(r => r.LibraryDetailComponent),
    canActivate: [authGuard]
  },
  {
    path: 'books',
    loadComponent: () => import('./book/books/books.component').then(r => r.BooksComponent),
    canActivate: [authGuard]
  },
  {
    path: 'book-add-form',
    loadComponent: () => import('./book/book-add-form/book-add-form.component').then(r => r.BookAddFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'book-add-isbn-form',
    loadComponent: () => import('./book/book-add-isbn-form/book-add-isbn-form.component').then(r => r.BookAddIsbnFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'book-detail/:id',
    loadComponent: () => import('./book/book-detail/book-detail.component').then(r => r.BookDetailComponent),
    canActivate: [authGuard]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: ''}
];
