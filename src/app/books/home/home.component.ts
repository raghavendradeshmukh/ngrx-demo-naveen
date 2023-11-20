import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBooks } from '../store/books.selector';
import { deleteBookAPI, getAllBooksAPI } from '../store/books.action';
import { AppState } from 'src/app/shared/local/app-state';
import { saveApiStatus } from 'src/app/shared/local/app.action';
import { apiSelector } from 'src/app/shared/local/app.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deleteModal: any;
  deleteID: number = 0;
  constructor(
    private store: Store,
    private appState: Store<AppState>
  ) { }

  books$ = this.store.pipe(select(selectAllBooks)); // from books.selector.ts

  ngOnInit() {
    this.store.dispatch(getAllBooksAPI()); // from books.action.ts
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
  }

  openDeletePopUp(id: number) {
    this.deleteID = id;
    this.deleteModal.show();
  }

  deleteConfirmation() {
    this.store.dispatch(deleteBookAPI({ id: this.deleteID }));
    let status$ = this.appState.pipe(select(apiSelector));
    status$.subscribe((res) => {
      if (res.apiStatus == 200) {
        this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }));
        this.deleteModal.hide();
      }
    });
  }
}
