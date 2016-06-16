import axios from 'axios'
import util from '../util'
import { getNotes } from './notes'

export const FINISH_GET_TODOS = 'FINISH_GET_TODOS'
function finishGetTodos(todos) {
    return {
        type: FINISH_GET_TODOS,
        todos 
    }
}

export const GET_TODOS = 'GET_TODOS'
export function getTodos() {
    return dispatch => {
        return axios.get('/api/todos/')
            .then(response => {
                dispatch(finishGetTodos(response.data))
            })
    }
}

export const CREATE_TODO = 'CREATE_TODO'
export function createTodo(todo) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.post('/api/todos/', { entry: todo }, { headers })
            .then(response => {
                dispatch(getTodos())
            })
    }
}

export function toggleTodo(todo) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.put(`/api/todo/${todo.id}/toggle`, { is_done: todo.isChecked }, { headers })
            .then(response => {
                dispatch(getTodos())
            })
    }
}

export function updateTodo(todo) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        const id = todo.id
        todo = {
            entry: todo.text,
            is_done: todo.isChecked
        }
        return axios.put(`/api/todo/${id}/`, todo, { headers })
            .then(response => {
                dispatch(getTodos())
            })
    }
}

export function deleteTodo(id) {
     return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.delete(`/api/todo/${id}/`, { headers })
            .then(response => {
                dispatch(getTodos())
            })
     }   
}

export const CONVERT_TODO = 'CONVERT_TODO'
export function convertTodo(id) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.put(`/api/todo/${id}/convert/`, {}, { headers })
            .then(response => {
                dispatch(getTodos())
                dispatch(getNotes())
            })
    }
}
