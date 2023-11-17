import { Component, OnInit } from '@angular/core';
import { Books } from '../store/books';
import { Store, select } from '@ngrx/store';
import { saveNewBookAPI } from '../store/books.action';
import { AppState } from 'src/app/shared/local/app-state';
import { apiSelector } from 'src/app/shared/local/app.selector';
import { Router } from '@angular/router';
import { saveApiStatus } from 'src/app/shared/local/app.action';

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

  constructor(
    private store: Store,
    private appState: Store<AppState>,
    private router: Router) { }

  ngOnInit() { }

  save() {
    this.store.dispatch(saveNewBookAPI({ book: { ...this.bookForm } }));
    let status$ = this.appState.pipe(select(apiSelector));
    status$.subscribe((res) => {
      console.log("res", res);
      if (res.apiStatus == 200) {
        // this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }));
        this.router.navigate(['/']);
      }
    });
  }
}
