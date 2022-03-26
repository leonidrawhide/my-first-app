import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    ModalComponent
 ],
})
export class BookComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
