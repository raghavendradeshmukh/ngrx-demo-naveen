import { Component, OnInit } from '@angular/core';
import { Books } from '../store/books';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { selectBookById } from '../store/books.selector';
import { updateBookAPI } from '../store/books.action';
import { AppState } from 'src/app/shared/local/app-state';
import { apiSelector } from 'src/app/shared/local/app.selector';
import { saveApiStatus } from 'src/app/shared/local/app.action';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  bookForm: Books = {
    id: 0,
    author: '',
    title: '',
    cost: 0,
  };

  constructor(private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private appState: Store<AppState>
  ) { }

  ngOnInit() {
    let fetchFormData$ = this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );

    fetchFormData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  update() {
    this.store.dispatch(updateBookAPI({ book: { ...this.bookForm } }));
    let status$ = this.appState.pipe(select(apiSelector));
    status$.subscribe((res) => {
      if (res.apiStatus == 200) {
        this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }));
        this.router.navigate(['/']);
      }
    });
  }
}
