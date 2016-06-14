import { SELECT_TAB } from '../actions/index'

const init = {
    activeTab: 'notes'
}

export default function app(state = init, action) {
    switch(action.type) {
        case SELECT_TAB:
            return { ...state, activeTab: action.tab }
        default:
            return state
    }
}
