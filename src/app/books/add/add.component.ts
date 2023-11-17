import { Component, OnInit } from '@angular/core';
import { Books } from '../store/books';
import { Store } from '@ngrx/store';
import { saveNewBookAPI } from '../store/books.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  bookForm: Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  constructor(private store: Store) { }

  ngOnInit() { }

  save() {
    this.store.dispatch(saveNewBookAPI({ book: { ...this.bookForm } }));
  }
}
