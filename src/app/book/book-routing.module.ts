import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { PageFiveComponent } from './page-five/page-five.component';
import { PageFourComponent } from './page-four/page-four.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';

const bookRoutes: Routes = [
  { path: 'book', component: BookComponent, children: [
    { path: '', redirectTo: 'page-1', pathMatch: 'full' },
    { path: 'page-1', component: PageOneComponent},
    { path: 'page-2', component: PageTwoComponent},
    { path: 'page-3', component: PageThreeComponent },
    { path: 'page-4', component: PageFourComponent },
    { path: 'page-5', component: PageFiveComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookRoutes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }