import { createFeatureSelector } from "@ngrx/store";
import { Books } from "./books";

export const selectAllBooks = createFeatureSelector<Books[]>("selectAllBooks");