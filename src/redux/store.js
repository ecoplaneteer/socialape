import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import user from "./reducers/user"
import data from "./reducers/data"
import UI from "./reducers/ui"

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  user,
  data,
  UI
})

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
