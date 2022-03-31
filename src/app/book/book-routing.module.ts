import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { BackGuard } from '../core/back.guard';
import { BookMainComponent } from './book-main/book-main.component';
import { BookComponent } from './book.component';
import { PageFiveComponent } from './page-five/page-five.component';
import { PageFourComponent } from './page-four/page-four.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { TableBooksComponent } from './table-books/table-books.component';

const bookRoutes: Routes = [
  { path: "book-main", component: BookComponent },
  { path: 'book', component: BookMainComponent, canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'page-1', pathMatch: 'full' },
    { path: 'page-1', component: PageOneComponent},
    { path: 'page-2', component: PageTwoComponent},
    { path: 'page-3', component: PageThreeComponent },
    { path: 'page-4', component: PageFourComponent },
    { path: 'page-5', component: PageFiveComponent }
    ] 
  },
  
  { path: 'book-table', component: TableBooksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }