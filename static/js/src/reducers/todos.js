import { FINISH_GET_TODOS } from '../actions/index'

const init = {
    items: []
}

export default function todos(state = init, action) {
    switch(action.type) {
        case FINISH_GET_TODOS:
            return { ...state, items: action.todos }
        default:
            return state
    }
}
