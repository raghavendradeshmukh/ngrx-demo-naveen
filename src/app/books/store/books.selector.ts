import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Books } from "./books";

export const selectAllBooks = createFeatureSelector<Books[]>("selectAllBooks");

export const selectBookById = (bookId: number) => {
    return createSelector(
        selectAllBooks,
        (books: Books[]) => {
            var bookById = books.filter(resp => resp.id == bookId);
            if (bookById.length === 0) {
                return null;
            }
            return bookById[0];
        }
    )
}
// alternative to above
// export const selectTaskById = (id: number) =>
//   createSelector(selectTasks, tasks => tasks.find(task => task.id === id));