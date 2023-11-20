import { createAction, props } from "@ngrx/store";
import { Books } from "./books";

export const getAllBooksAPI = createAction(
    "[get All books] Action"
);

export const getAllBooksAPISuccess = createAction(
    "[get All books Success] Action",
    props<{ allBooks: Books[] }>()
);

export const saveNewBookAPI = createAction(
    "[save new book] Action",
    props<{ book: Books }>()
);

export const saveNewBookAPISuccess = createAction(
    "[save new book Success] Action",
    props<{ response: Books }>()
);

export const updateBookAPI = createAction(
    "[update new book] Action",
    props<{ book: Books }>()
);

export const updateBookAPISuccess = createAction(
    "[update new book Success] Action",
    props<{ book: Books }>()
);

export const deleteBookAPI = createAction(
    "[delete book] Action",
    props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
    "[delete book success] Action",
    props<{ id: number }>()
);
