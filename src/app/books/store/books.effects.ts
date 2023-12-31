import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { deleteBookAPI, deleteBookAPISuccess, getAllBooksAPI, getAllBooksAPISuccess, saveNewBookAPI, saveNewBookAPISuccess, updateBookAPI, updateBookAPISuccess } from "./books.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/local/app-state";
import { saveApiStatus } from "src/app/shared/local/app.action";
import { Books } from "./books";
import { selectAllBooks } from "./books.selector";

@Injectable()
export class BooksEffects {

    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private appState: Store<AppState>,
        private store: Store<Books>
    ) { }


    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllBooksAPI),
            withLatestFrom(this.store.pipe(select(selectAllBooks))),
            switchMap(([, bookStore]) => {
                if (bookStore.length > 0) {
                    return EMPTY;
                }
                return this.booksService
                    .getAllBooks()
                    .pipe(map((data) =>
                        getAllBooksAPISuccess({ allBooks: data })
                    ));
            })
        )
    );

    saveNewBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveNewBookAPI),
            switchMap((book) => {
                this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }))
                return this.booksService
                    .saveNewBook(book.book)
                    .pipe(map((data) => {
                        this.appState.dispatch(saveApiStatus({ status: { apiStatus: 200, apiResponseMessage: 'success' } }));
                        return saveNewBookAPISuccess({ response: data })
                    }))
            })
        )
    );

    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateBookAPI),
            switchMap((book) => {
                this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }))
                return this.booksService
                    .updateBook(book.book)
                    .pipe(map((data) => {
                        this.appState.dispatch(saveApiStatus({ status: { apiStatus: 200, apiResponseMessage: 'success' } }));
                        return updateBookAPISuccess({ book: data })
                    }))
            })
        )
    );

    deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBookAPI),
            switchMap((action) => {
                this.appState.dispatch(saveApiStatus({ status: { apiStatus: 0, apiResponseMessage: '' } }))
                return this.booksService.deleteBookAPI(action.id)
                    .pipe(map((response) => {
                        this.appState.dispatch(saveApiStatus({ status: { apiStatus: 200, apiResponseMessage: 'success' } }))
                        return deleteBookAPISuccess({ id: action.id })
                    }))
            })
        )
    );
}

