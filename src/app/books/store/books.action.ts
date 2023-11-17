import { createAction, props } from "@ngrx/store";
import { Books } from "./books";

export const getAllBooksAPI = createAction(
    "[get All books] Action"
);

export const getAllBooksAPISuccess = createAction(
    "[get All books Success] Action",
    props<{ allBooks: Books[] }>()
);