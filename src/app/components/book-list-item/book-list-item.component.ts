import { Component, Input, OnInit } from '@angular/core';
import { IBookDTO } from 'src/app/modules/BookDTOs/bookDTO';
import { BookService } from 'src/app/services/book.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() book:IBookDTO
  constructor(public bookService:BookService,
    private modalService:ModalService) { }

  ngOnInit() {
  }

  handleViewClick(id: number){
    this.modalService.open()
    this.bookService.getBook(id)
  }
}
