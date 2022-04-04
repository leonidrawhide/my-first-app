import { async, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { TableBooksService } from './table-books.service';
import { TableBooksComponent } from './table-books.component';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

describe('TableBooksService', () => {
  let service: TableBooksService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      declarations: [
        TableBooksComponent
      ],
      providers: [
        TableBooksService, 
        HttpClient
      ]
    })

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TableBooksService);
  });

  it('should be created', inject([TableBooksService], (service: TableBooksService) => {
    expect(service).toBeTruthy();
  }));

  it('should get both sets of books', inject(
      [HttpTestingController, TableBooksService],
      (httpMock: HttpTestingController, service: TableBooksService) => {
        const mockBooks = {
          "title1": "Harry Potter and the Order of the Phoenix",
          "title2": "The Hunger Games",
          "title3": "The Book Thief"
        }

        service.getSets().subscribe(data => {
          expect(data.set1.data[0].title).toEqual(mockBooks.title1);
          expect(data.set1.data[1].title).toEqual(mockBooks.title2);
          expect(data.set1.data[2].title).toEqual(mockBooks.title3);
        });

        const mockReq = httpMock.expectOne(service.urlOne + '/books.json');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockBooks);

        httpMock.verify();
      }
    )
  );

  it('Both sets should be are greater than 0 and equal to each other', inject(
    [HttpTestingController, TableBooksService],
    (httpMock: HttpTestingController, service: TableBooksService) => {

      service.getSets().subscribe(data => {
        expect(data.set1.data.length).toBeGreaterThan(0);
        expect(data.set2.data.length).toBeGreaterThan(0);
      });

      const mockReq = httpMock.expectOne(service.urlOne + '/books.json');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      httpMock.verify();
    }
    )
  );
});