import axios from 'axios'
import util from '../util'
import { getTodos } from './todos'

export const FINISH_CREATE_NOTE = 'FINISH_CREATE_NOTE'
function finishCreateNote() {
    return {
        type: FINISH_CREATE_NOTE,
    }
}

export const CREATE_NOTE = 'CREATE_NOTE'
export function createNote(data) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.post('/api/notes/', data, { headers })
            .then(response => {
                dispatch(finishCreateNote())
                dispatch(getNotes())
            })
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
        return axios.get('/api/notes/')
            .then(response => {
                dispatch(finishGetNotes(response.data))
            })
    }
}

export const UPDATE_NOTE = 'UPDATE_NOTE'
export function updateNote(note) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.put('/api/notes/', note, { headers })
            .then(response => {
                dispatch(getNotes())
            })
    }
}

export const DELETE_NOTE = 'DELETE_NOTE'
export function deleteNote(id) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.delete(`/api/note/${id}`, { headers })
            .then(response => {
                dispatch(getNotes())
            })
    }
}

export const CONVERT_NOTE = 'CONVERT_NOTE'
export function convertNote(id) {
    return dispatch => {
        const headers = util.setCsrfHeaders()
        return axios.put(`/api/note/${id}/convert/`, {}, { headers })
            .then(response => {
                dispatch(getNotes())
                dispatch(getTodos())
            })
    }
}
