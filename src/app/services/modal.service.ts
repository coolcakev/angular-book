import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isVisible$ = new BehaviorSubject(true);
  constructor() { }

  open() {
    this.isVisible$.next(true);
  }
  close() {
    this.isVisible$.next(false);
  }

}
