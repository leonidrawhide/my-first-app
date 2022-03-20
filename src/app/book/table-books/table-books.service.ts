import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../../message.service';
import { FirstSet } from './table-books';

@Injectable({
  providedIn: 'root'
})
export class TableBooksService {

  urlOne: string = 'api/firstSet';
  urlTwo: string = 'api/secondSet';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  getSetOne(): Observable<FirstSet[]> {
    return this.http.get<FirstSet[]>(this.urlOne).pipe(
        tap(_ => this.log('fetched first set data of books')),
        catchError(this.handleError<FirstSet[]>('getSetOne', []))
    )
  }

  getSetTwo(): Observable<FirstSet[]> {
    return this.http.get<FirstSet[]>(this.urlTwo).pipe(
        tap(_ => this.log('fetched second set data of books')),
        catchError(this.handleError<FirstSet[]>('getSetTwo', []))
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
