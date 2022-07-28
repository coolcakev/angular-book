import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateBookDTO } from 'src/app/modules/BookDTOs/createBookDTo';
import { BookService } from 'src/app/services/book.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() book: ICreateBookDTO
  isSubmited = false
  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    cover: new FormControl(''),
    coverFile: new FormControl<File>(null),
    genre: new FormControl<string>('', [Validators.required]),
    author: new FormControl<string>('', [Validators.required]),
    content: new FormControl<string>('')
  });

  constructor(public bookService: BookService,
    private fileService: FileService) { }

  get title() {
    return this.form.controls.title as FormControl;
  }
  get genre() {
    return this.form.controls.genre as FormControl;
  }
  get author() {
    return this.form.controls.author as FormControl;
  }
  get content() {
    return this.form.controls.content as FormControl;
  }
  get coverFile() {
    return this.form.controls.coverFile as FormControl;
  }
  get cover() {
    return this.form.controls.cover as FormControl;
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    const { title, genre, content, author, cover, book } = this
    title.setValue(book.title);
    genre.setValue(book.gener);
    content.setValue(book.content);
    author.setValue(book.author);
    cover.setValue(book.cover)
  }

  onFileChange(event: Event) {
    const htmlElement = event.target as HTMLInputElement

    if (htmlElement?.files.length == 0) {
      return
    }

    const file = htmlElement.files[0];
    this.form.patchValue({
      coverFile: file
    });
  }

  async submit() {
    if (this.form.status != "VALID") {
      this.isSubmited = true;
      console.log(this.form);
      return
    }
    this.isSubmited = false;
    const cover = this.getCover();
    console.log()
    const book: ICreateBookDTO = {
      id: this.book.id,
      title: this.title.value,
      author: this.author.value,
      content: this.content.value,
      cover: cover,
      gener: this.genre.value
    }
    this.bookService.create(book, this.coverFile.value);
  }
  private getCover(): string {
    const file = this.coverFile.value as File
    console.log(file);
    if (file == null) {
      return this.book.id!=null?this.book.cover:""
    }   
    return file.name;
  }
}
