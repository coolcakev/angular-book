import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { IBookDTO } from '../modules/BookDTOs/bookDTO';
import { ErrorService } from './error.service';
import { ICreateBookDTO } from '../modules/BookDTOs/createBookDTo';
import { IViewBookDTo } from '../modules/BookDTOs/viewBookDTo';
import { FileService } from './file.service';
import { api } from '../constants';

@Injectable({ providedIn: 'root' })
export class BookService {

  currentUpdateBook = new BehaviorSubject<ICreateBookDTO>(this.defaultCreateBook());
  currentViewBook$: Observable<IViewBookDTo>
  books$: Observable<IBookDTO[]>
  bookApi = `${api}/books`
  recomendedApi = `${api}/recomended`
  methodGetAll = "getAll"

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService,
    private fileService: FileService
  ) { }

  defaultCreateBook(): ICreateBookDTO {
    return {
      author: "",
      content: "",
      cover: "",
      gener: "",
      title: ""
    }
  }
  changeCurrentUpdateBook(book: ICreateBookDTO) {
    this.currentUpdateBook.next(book);
  }
  clearCurrentUpdateBook() {
    this.currentUpdateBook.next(this.defaultCreateBook());
  }
  getAll() {
    this.methodGetAll = "getAll"
    this.books$ = this.httpClient.get<IBookDTO[]>(this.bookApi, {
      params: new HttpParams({
        fromObject: {
          order: "title"
        }
      })
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  getRecommended() {
    this.methodGetAll = "getRecommended"
    this.books$ = this.httpClient.get<IBookDTO[]>(this.recomendedApi, {
      params: new HttpParams({
        fromObject: {
          genre: ""
        }
      })
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  create(book: ICreateBookDTO, file: File) {
    this.httpClient.post(`${this.bookApi}/save`, book).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(async () => {
      if (file != null) {
        await this.fileService.create(file).pipe(
          catchError(this.handleError.bind(this))
        ).toPromise()
      }
      if (this.methodGetAll == "getAll") {
        this.getAll()
      }
      else {
        this.getRecommended()
      }

    });

  }
  getBook(id: number) {
    this.currentViewBook$ = this.httpClient.get<IViewBookDTo>(`${this.bookApi}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
  private handleError(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message);
  }
}