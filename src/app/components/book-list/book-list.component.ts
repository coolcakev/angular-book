import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookDTO } from 'src/app/modules/BookDTOs/bookDTO';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    
  constructor(public bookService: BookService) { }
  ngOnInit() {
     this.bookService.getAll();    
  }

}
