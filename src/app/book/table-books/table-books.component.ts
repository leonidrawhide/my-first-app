import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartTransferService } from '../chart-transfer.service';
import { ChartComponent } from '../chart/chart.component';
import { ModalComponent } from '../modal/modal.component';
import { BothSets, FirstSet, SecondSet } from './table-books';
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
  constructor(
    private tableBooksService: TableBooksService,
    private chartTransfer: ChartTransferService,
    public dialog: MatDialog
  ) {}

  table: BothSets[] = [];
  tmp: BothSets[] = []
  total: number = 0
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  description: string | null = null;

  getSets(): void {
    this.tableBooksService.getSets()
        .subscribe(table => {
          this.tmp = table
          this.addStream()
        })
  }

  addStream(): void {
    if (this.table.length != 0) {
      this.table.map(a => Object.assign(a, this.tmp.find((b: SecondSet) => b.id == a.id)));
    }
    else {
      this.table = this.tmp
    }
  }

  calculateTotal(): void {
    this.total = 0
    for (let i = 0; i < this.table.length; i++) {
      this.total += this.table[i].qtyRelease
    }
  }

  openDialog(): void {
    this.chartTransfer.saveData(this.table)
    console.log("opened dialog")
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.table,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.getSets()
  }

  ngDoCheck(): void {
    this.calculateTotal()
  }
}
