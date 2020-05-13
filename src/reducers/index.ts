import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer } from "redux";
import { combineReducers } from "redux-immutable";
import { favorites } from "~/reducers/favorites";
import { inquiries } from "~/reducers/inquiries";
import { providers } from "~/reducers/providers";
import { user } from "./user";

const rootReducer: Reducer = combineReducers({
  user,
  providers,
  inquiries,
  favorites
});

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
