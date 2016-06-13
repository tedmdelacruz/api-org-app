import { FINISH_GET_NOTES, FINISH_CREATE_NOTE } from '../actions/index'

const init = {
    isCreateMode: false,
    items: []
}

export default function app(state = init, action) {
    switch(action.type) {
        case FINISH_GET_NOTES:
            return Object.assign({}, state, {
                items: action.notes
            })
        case FINISH_CREATE_NOTE:
            return Object.assign({}, state, {
                isCreateMode: false
            })
        default:
            return state
    }
}
