import { FINISH_GET_NOTES, FINISH_CREATE_NOTE } from '../actions/index'

const init = {
    isCreateMode: false,
    items: []
}

export default function app(state = init, action) {
    switch(action.type) {
        case FINISH_GET_NOTES:
            return { ...state, items: action.notes }
        case FINISH_CREATE_NOTE:
            return { ...state, isCreateMode: false }
        default:
            return state
    }
}
