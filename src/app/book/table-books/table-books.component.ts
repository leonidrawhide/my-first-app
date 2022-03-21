import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, delay, Observable, of, Subscription, tap } from 'rxjs';
import { MessageService } from '../../message.service';
import { FirstSet, SecondSet } from './table-books';
import { TableBooksService } from './table-books.service';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableBooksComponent implements OnInit {
  expandedElement: FirstSet | null = null;
  constructor(private tableBooksService: TableBooksService) {}

  table: FirstSet[] = [];
  total: number = 0
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  description: string | null = null;

  getSetOne() {
    this.tableBooksService.getSetOne()
        .subscribe(table => this.table = table);
  }

  getSetTwo(id: number) {
    this.tableBooksService.getSetTwo()
        .subscribe(resp => this.description = resp[id].description)
  }

  calculateTotal(): void {
    for (let i = 0; i < this.table.length; i++) {
      this.total += this.table[i].qtyRelease
    }
  }

  onRowClick(data: FirstSet) {
    this.description = null
    this.getSetTwo(data.id - 1);
  }

  ngOnInit(): void {
    this.getSetOne()
  }

  ngDoCheck(): void {
    this.total = 0
    this.calculateTotal()
  }
}
