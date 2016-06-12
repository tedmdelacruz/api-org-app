import axios from 'axios'
import cookie from 'cookie'

export const START_CREATE_NOTE = 'START_CREATE_NOTE'
function startCreateNote() {
    return {
        type: START_CREATE_NOTE
    }
}

export const FINISH_CREATE_NOTE = 'FINISH_CREATE_NOTE'
function finishCreateNote() {
    return {
        type: FINISH_CREATE_NOTE,
    }
}

export const CREATE_NOTE = 'CREATE_NOTE'
export function createNote(data) {
    return dispatch => {
        dispatch(startCreateNote())

        const { csrftoken } = cookie.parse(document.cookie)

        if ( ! csrftoken) {
            throw "CSRF Token is required"
        }

        const headers = { 'X-CSRFToken': csrftoken }

        return axios.post('/api/notes/', data, { headers })
            .then(response => {
                dispatch(finishCreateNote())
                dispatch(getNotes())
            })
    } 
}

export const START_GET_NOTES = 'START_GET_NOTES'
function startGetNotes() {
    return {
        type: START_GET_NOTES
    }
}

export const FINISH_GET_NOTES = 'FINISH_GET_NOTES'
function finishGetNotes(notes) {
    return {
        type: FINISH_GET_NOTES,
        notes
    }
}

export const GET_NOTES = 'GET_NOTES'
export function getNotes() {
    return dispatch => {
        dispatch(startGetNotes())
        return axios.get('/api/notes/')
            .then(response => {
                dispatch(finishGetNotes(response.data))
            })
    }
}

export const EDIT_NOTE = 'EDIT_NOTE'
export function editNote(note) {
    return {
        type: EDIT_NOTE,
        note
    }
}

export const DELETE_NOTE = 'DELETE_NOTE'
export function deleteNote(note) {
    return {
        type: DELETE_NOTE,
        note
    }
}

