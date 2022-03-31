import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookMainComponent } from './book/book-main/book-main.component';
import { BookComponent } from './book/book.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { BackGuard } from './core/back.guard';
// import { TableBooksComponent } from './book/table-books/table-books.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'book-main', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormComponent },
  { path: 'auth', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }