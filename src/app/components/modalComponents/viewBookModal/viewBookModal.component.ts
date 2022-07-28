import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-view-book-modal',
  templateUrl: './viewBookModal.component.html',
  styleUrls: ['./viewBookModal.component.css']
})
export class ViewBookModalComponent implements OnInit {

  constructor(public modalService:ModalService,
    public bookService:BookService) { }

  ngOnInit() {
  }

}
