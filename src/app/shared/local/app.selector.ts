import { createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app-state";

export const apiSelector = createFeatureSelector<AppState>("apiState");