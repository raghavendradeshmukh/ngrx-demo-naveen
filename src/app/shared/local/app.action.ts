import { createAction, props } from "@ngrx/store";
import { AppState } from "./app-state";

export const saveApiStatus = createAction(
    "[API] save or fail Action",
    props<{ status: AppState }>()
)