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
}
