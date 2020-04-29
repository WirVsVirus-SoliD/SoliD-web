import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer } from "redux";
import { combineReducers } from "redux-immutable";
import { providers } from "~/reducers/providers";
import { user } from "./user";

const rootReducer: Reducer = combineReducers({
  user,
  providers
});

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
