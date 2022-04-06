import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, Observable, of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

import { TableBooksComponent } from './table-books.component';
import { TableBooksService } from './table-books.service';

describe('TableBooksComponent', () => {
  let component: TableBooksComponent;
  let fixture: ComponentFixture<TableBooksComponent>;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        TableBooksService,
        HttpClient,
        MatDialog,
        Overlay
      ]
    })

    fixture = TestBed.createComponent(TableBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  // it('should open dialog without any problems', fakeAsync(() => {
  //   spyOn(component, 'openDialog')
  //   component.openDialog();
  //   expect(component.dialog).toBeTrue();
  // }));

  // it('should call calculateTotal() without any problems', async () => {
  //   spyOn(component, 'calculateTotal')
  //   component.calculateTotal();
  //   expect(component.calculateTotal).toHaveBeenCalled();
  // })

  // it('should call openDialog() without any problems', async () => {
  //   spyOn(component, 'openDialog')
  //   component.openDialog();
  //   expect(component.openDialog).toHaveBeenCalled();
  // })
});
