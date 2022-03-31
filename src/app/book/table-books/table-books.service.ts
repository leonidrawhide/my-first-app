import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concat, Observable, of, tap } from 'rxjs';
import { MessageService } from '../../message.service';
import { BothSets, BothSetsAPI } from './table-books';

@Injectable({
  providedIn: 'root'
})
export class TableBooksService {

  urlOne: string = 'http://localhost:4200/api';
  urlTwo: string = 'api/secondSet';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

    getSets(): Observable<BothSetsAPI> {
    return concat(
        this.http.get<BothSetsAPI>(`${this.urlOne}/books.json`)
      ).pipe(
        tap(resp => {
          // console.info(resp, 'json data of books')
        })
        // tap(_ => this.log('fetched set data of books')),
        // catchError(this.handleError<BothSets[]>('getSets', []))
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
