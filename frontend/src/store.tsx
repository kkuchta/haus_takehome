import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'


declare global {
  interface Window {
    store: any
  }
}
export default (window.store = createStore(rootReducer, applyMiddleware(thunk)));

export type AppState = ReturnType<typeof rootReducer>
