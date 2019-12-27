import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import user from "./reducers/user"
import data from "./reducers/data"
import UI from "./reducers/ui"

const initialState = {}

const middlewares = [thunk]

const reducers = combineReducers({
  user,
  data,
  UI
})

const middlewareEnhancer = applyMiddleware(...middlewares)
const composedEnhancers =
  process.env.NODE_ENV === "production"
    ? middlewareEnhancer
    : composeWithDevTools(middlewareEnhancer)

const store = createStore(reducers, initialState, composedEnhancers)

export default store
