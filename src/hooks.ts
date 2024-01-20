
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store/rootStore";


export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
