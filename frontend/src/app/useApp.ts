// src/store/hooks.ts
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "@app/store";

// Use instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Use instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
