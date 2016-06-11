import { SELECT_TAB,
    RETRIEVE_DATA, RECEIVE_DATA } from './actions'

export function reducer(state = {
    data: '',
    activeTab: 'notes',
    isFetching: false
}, action) {
    switch(action.type) {
        case SELECT_TAB:
            return Object.assign({}, state, {
                activeTab: action.tab
            })
        case RETRIEVE_DATA:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            })
        default:
            return state
    }
}
