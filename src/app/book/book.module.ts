import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageFourComponent } from './page-four/page-four.component';
import { PageFiveComponent } from './page-five/page-five.component';
import { PaginationComponent } from './pagination/pagination.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BookComponent,
    PageOneComponent, 
    PageTwoComponent, 
    PageThreeComponent, 
    PageFourComponent, 
    PageFiveComponent,
    PaginationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatButtonModule
  ]
})
export class BookModule { }
