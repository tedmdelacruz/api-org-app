import { combineReducers } from 'redux'
import app from './app'
import notes from './notes'
import todos from './todos'

export default combineReducers({
    app,
    notes,
    todos
})
