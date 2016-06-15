import axios from 'axios'
import util from '../util'

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

        return axios.put(`/api/todo/${todo.id}/`, { is_done: todo.isChecked }, { headers })
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