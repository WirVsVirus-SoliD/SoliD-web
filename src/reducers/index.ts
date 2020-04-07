import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux-immutable";
import { user } from "./user";

const rootReducer = combineReducers({
  user
});

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
