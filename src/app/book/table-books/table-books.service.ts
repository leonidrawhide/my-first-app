import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, combineLatest, concat, forkJoin, map, merge, Observable, of, tap } from 'rxjs';
import { MessageService } from '../../message.service';
import { BothSets, FirstSet, SecondSet } from './table-books';

@Injectable({
  providedIn: 'root'
})
export class TableBooksService {

  urlOne: string = 'api/firstSet';
  urlTwo: string = 'api/secondSet';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  getSets(): Observable<BothSets[]> {
    return concat(
        this.http.get<BothSets[]>(this.urlOne).pipe(),
        this.http.get<BothSets[]>(this.urlTwo).pipe()
      ).pipe(
        tap(_ => this.log('fetched set data of books')),
        catchError(this.handleError<BothSets[]>('getSets', []))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Table-books: ${message}`);
  }
}
