import { CREATE_NOTE, FINISH_GET_NOTES } from '../actions/index'

const init = {
    form: {
        title: '',
        text: ''
    },
    notes: []
}

export default function app(state = init, action) {
    switch(action.type) {
        case FINISH_GET_NOTES:
            return Object.assign({}, state, {
                form: {
                    title: '',
                    text: ''
                },
                notes: action.notes
            })
        default:
            return state
    }
}
