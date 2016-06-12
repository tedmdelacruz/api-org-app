import axios from 'axios'
import cookie from 'cookie'

export const START_CREATE_NOTE = 'START_CREATE_NOTE'
function startCreateNote() {
    return {
        type: START_CREATE_NOTE
    }
}

export const CREATE_NOTE = 'CREATE_NOTE'
export function createNote(data) {
    return dispatch => {
        dispatch(startCreateNote)

        const { csrftoken } = cookie.parse(document.cookie)

        if ( ! csrftoken) {
            throw "CSRF Token is required"
        }

        const headers = { 'X-CSRFToken': csrftoken }

        return axios.put('/notes/', { data }, { headers })
            .then(response => {
                // FIXME
            })
    } 
}
