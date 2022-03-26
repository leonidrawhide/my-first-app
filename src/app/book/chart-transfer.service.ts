import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BothSets } from './table-books/table-books';

@Injectable({
  providedIn: 'root'
})
export class ChartTransferService {

  data: BothSets[] | undefined;

  constructor(private router:Router) { }

  saveData(data: BothSets[]) {
    this.data = data
  }

  getData() {
    return this.data
  }
}
