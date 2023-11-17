import { createReducer, on } from "@ngrx/store";
import { Books } from "./books";
import { getAllBooksAPISuccess } from "./books.action";

export const initialBookState: ReadonlyArray<Books> = [
];

export const booksReducer = createReducer(
    initialBookState,
    on(getAllBooksAPISuccess, (state, { allBooks }) => {
        return allBooks
    }));    