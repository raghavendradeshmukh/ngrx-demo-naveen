import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Books } from './store/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<Books[]>("http://localhost:3000/books");
  }

  saveNewBook(book: Books) {
    return this.http.post<Books>("http://localhost:3000/books", book);
  }

  updateBook(book: Books) {
    return this.http.put<Books>(`http://localhost:3000/books/${book.id}`, book);
  }
}
