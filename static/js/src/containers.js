import { connect } from 'react-redux'
import * as actions from './actions/index'
import * as components from './components/App'

export const App = connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return {
            selectTab: tab => dispatch(actions.selectTab(tab)),
            notesActions: {
                getNotes: () => dispatch(actions.getNotes()),
                noteActions: {
                    createNote: note => dispatch(actions.createNote(note)),
                    updateNote: note => dispatch(actions.updateNote(note)),
                    deleteNote: note => dispatch(actions.deleteNote(note)),
                }
            },
            todoActions: {
                getTodos: () => dispatch(actions.getTodos()),
                createTodo: todo => dispatch(actions.createTodo(todo)),
                toggleTodo: todo => dispatch(actions.toggleTodo(todo))
            }
        }
    }
)(components.App)
