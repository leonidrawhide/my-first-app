import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FenceCasePipe } from './fence-case.pipe';
import { BookModule } from './book/book.module';
import { TableBooksComponent } from './book/table-books/table-books.component';
import { TextModificatorDirective } from './directives/text-modificator.directive';
import { RainbowModificatorDirective } from './directives/rainbow-modificator.directive';
import { TextModificatorHostDirective } from './directives/text-modificator-host.directive';
import { FormComponent } from './form/form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomApiInterceptor } from './custom-api.interceptor';
import { LoginComponent } from './login/login.component';
import { environment } from "./login/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGuard } from './core/auth.guard';
import { BackGuard } from './core/back.guard';



@NgModule({
  declarations: [ 
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    FenceCasePipe,
    TableBooksComponent,
    TextModificatorDirective,
    RainbowModificatorDirective,
    TextModificatorHostDirective,
    // ChartComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BookModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomApiInterceptor,
      multi: true,
    },
    AuthService,
    BackGuard,
    { 
      provide: AuthGuard, 
      useClass: AuthGuard
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
