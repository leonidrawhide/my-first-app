import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookComponent } from './book/book.component';
import { PageOneComponent } from './book/page-one/page-one.component';
import { PageTwoComponent } from './book/page-two/page-two.component';
import { PageThreeComponent } from './book/page-three/page-three.component';
import { PageFourComponent } from './book/page-four/page-four.component';
import { PageFiveComponent } from './book/page-five/page-five.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  // { path: 'book', component: BookComponent, children: [
  //   { path: 'page-1', component: PageOneComponent, outlet: 'book' },
  //   { path: 'page-2', component: PageTwoComponent, outlet: 'book' },
  //   { path: 'page-3', component: PageThreeComponent, outlet: 'book' },
  //   { path: 'page-4', component: PageFourComponent, outlet: 'book' },
  //   { path: 'page-5', component: PageFiveComponent, outlet: 'book' },
  //   ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }