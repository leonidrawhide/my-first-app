import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';
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
  providers: [TableBooksService]
})
export class TableBooksComponent implements OnInit {
  expandedElement: FirstSet | null = null;
  constructor(
    private tableBooksService: TableBooksService,
    private chartTransfer: ChartTransferService,
    public dialog: MatDialog,
    private LoginService: LoginService
  ) {}

  table: BothSets[] = [];
  tmp: BothSets[] = []
  total: number = 0
  displayedColumns: string[] = ['id', 'title', 'qtyRelease'];
  description: string | null = null;
  // loginStatus: boolean = this.LoginService.loginStatus;

  getSets(): void {
    this.tableBooksService.getSets()
        .subscribe(table => {
          this.table = table.set1.data.map(a => 
            Object.assign(a, table.set2.data.find((b: SecondSet) => 
              b.id == a.id
            ))
          );
        })
    // console.log('============')
    // console.log(this.table)
    // console.log('============')
  }

  calculateTotal(): void {
    // console.log('++++++')
    // console.log(this.table)
    // console.log('++++++++')
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
