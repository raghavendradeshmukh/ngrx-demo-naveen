import { State, createReducer, on } from "@ngrx/store";
import { Books } from "./books";
import { deleteBookAPISuccess, getAllBooksAPISuccess, saveNewBookAPISuccess, updateBookAPISuccess } from "./books.action";
import { state } from "@angular/animations";

export const initialBookState: ReadonlyArray<Books> = [
];

export const booksReducer = createReducer(
    initialBookState,
    on(getAllBooksAPISuccess, (state, { allBooks }) => {
        return allBooks;
    }),
    on(saveNewBookAPISuccess, (state, { response }) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateBookAPISuccess, (state, { book }) => {
        let filteredState = state.filter(resp => resp.id !== book.id);
        filteredState.unshift(book);
        return filteredState;
    }),
    on(deleteBookAPISuccess, (state, { id }) => {
        let filteredState = state.filter(resp => resp.id !== id);
        return filteredState;
    })
);    