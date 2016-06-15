import { FINISH_GET_TODOS } from '../actions/index'

const init = {
    items: []
}

export default function todos(state = init, action) {
    switch(action.type) {
        case FINISH_GET_TODOS:
            let items = []
            action.todos.map(todo => {
                items.push({
                    id: todo.pk,
                    text: todo.fields.entry,
                    isChecked: todo.fields.is_done
                })
            })
            return { ...state, items }
        default:
            return state
    }
}
