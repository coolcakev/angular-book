import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscriber, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import {api} from '../constants'
@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileApi = `${api}/files`
  constructor(private httpClient: HttpClient,
    private errorService: ErrorService) { }

  create(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post(this.fileApi, formData)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  convertToBase64(file: File) {
    return new Observable((subscriber: Subscriber<string | ArrayBuffer>) => {
      this.readFile(file, subscriber);
    })
  }
  private readFile(file: File, subscriber: Subscriber<string | ArrayBuffer>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete()
    }
    fileReader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  }
  private handleError(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message);
  }
}
