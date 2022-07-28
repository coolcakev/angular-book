import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private _snackBar: MatSnackBar) {

  }
  error$ = new Subject<string>()

  handle(message: string) {
    this.error$.next(message);       
    this.openSnackBar(message)
  }
  clear() {
    this.error$.next("")
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close',{
      duration: 2000,
      horizontalPosition:'right',
      verticalPosition:'top',
    });
  }
}
