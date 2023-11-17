import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBooks } from '../store/books.selector';
import { getAllBooksAPI } from '../store/books.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store) { }

  books$ = this.store.pipe(select(selectAllBooks)); // from books.selector.ts

  ngOnInit() {
    this.store.dispatch(getAllBooksAPI()); // from books.action.ts
  }
}
