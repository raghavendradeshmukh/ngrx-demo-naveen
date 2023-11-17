import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { createFeature } from "@ngrx/store";
import { getAllBooksAPI, getAllBooksAPISuccess } from "./books.action";
import { exhaustMap, map, switchMap } from "rxjs";

@Injectable()
export class BooksEffects {

    constructor(
        private actions$: Actions,
        private booksService: BooksService
    ) { }


    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllBooksAPI),
            switchMap(() => {
                return this.booksService
                    .getAllBooks()
                    .pipe(map((data) =>
                        getAllBooksAPISuccess({ allBooks: data })
                    ));
            })
        )
    );
}
