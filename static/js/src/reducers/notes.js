import { CREATE_NOTE } from '../actions/index'

const init = {
    form: {
        title: '',
        text: ''
    },
    entries: []
}

export default function app(state = init, action) {
    switch(action.type) {
        case CREATE_NOTE:
            return Object.assign({}, state, { form })
        default:
            return state
    }
}
