import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, delay, Observable, of, Subscription, tap } from 'rxjs';
import { MessageService } from '../message.service';
import { FirstSet, SecondSet } from './table-books';
import { TableBooksService } from './table-books.service';

@Component({
  selector: 'app-table-books',
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.scss']
})
export class TableBooksComponent implements OnInit {

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
    this.getSetTwo(data.id - 1);
  }

// scroll() {
//     console.log(this.description)
//     let el = document.getElementById('cardAnchor');
//     el?.scrollIntoView({ behavior: "smooth"});
// }

  ngOnInit(): void {
    this.getSetOne()
  }

  ngDoCheck(): void {
    this.total = 0
    this.calculateTotal()
  }
}
