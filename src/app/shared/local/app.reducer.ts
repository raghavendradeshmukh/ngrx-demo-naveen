import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app-state";
import { saveApiStatus } from "./app.action";

export const apiInitialState: AppState = {
    apiStatus: 0,
    apiResponseMessage: ''
}

export const appReducer = createReducer(apiInitialState,
    on(saveApiStatus, (state, { status }) => {
        return status;
    })
);