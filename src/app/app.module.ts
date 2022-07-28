import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksPageComponent } from './components/books-page/books-page.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { MaterialModule } from 'src/material.module';
import { BookListItemComponent } from './components/book-list-item/book-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewBookModalComponent } from './components/modalComponents/viewBookModal/viewBookModal.component';
import { UrlForPhotoPipe } from './pipes/urlForPhoto.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooksPageComponent,
    BookListComponent,
    BookListItemComponent,
    EditBookComponent,    
    ViewBookModalComponent,
    UrlForPhotoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
