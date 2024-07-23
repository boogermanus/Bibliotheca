import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrariesComponent } from './library/libraries/libraries.component';
import { authGuard } from './guards/auth.guard';
import { LibraryViewComponent } from './library/library-view/library-view.component';
import { BooksComponent } from './book/books/books.component';
import { BookAddFormComponent } from './book/book-add-form/book-add-form.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'libraries', component: LibrariesComponent, canActivate: [authGuard] },
    { path: 'library/:id', component: LibraryViewComponent, canActivate: [authGuard] },
    { path: 'books', component: BooksComponent, canActivate: [authGuard] },
    { path: 'book-add-form', component: BookAddFormComponent, canActivate: [authGuard] },
    { path: 'book-detail/:id', component: BookDetailComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, pathMatch: 'full', redirectTo: '' }
];
