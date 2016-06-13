import { SELECT_TAB } from './actions'

const init = {
    activeTab: 'notes'
}

export function reducer(state = init, action) {
    switch(action.type) {
        case SELECT_TAB:
            return Object.assign({}, state, {
                activeTab: action.tab
            })
        case FINISH_CREATE_NOTE:
            return Object.assign({}, state, {
                activeTab: action.tab
            })
        default:
            return state
    }
}
