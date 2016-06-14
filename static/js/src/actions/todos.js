import axios from 'axios'

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
        return axios.get('/api/todos')
            .then(response => {
                dispatch(finishGetTodos(response.data))
            })
    }
}