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
                    deleteNote: id => dispatch(actions.deleteNote(id)),
                    convertNote: id => dispatch(actions.convertNote(id))
                }
            },
            todoActions: {
                getTodos: () => dispatch(actions.getTodos()),
                createTodo: todo => dispatch(actions.createTodo(todo)),
                todoItemActions: {
                    toggleTodo: todo => dispatch(actions.toggleTodo(todo)),
                    updateTodo: todo => dispatch(actions.updateTodo(todo)),
                    deleteTodo: id => dispatch(actions.deleteTodo(id)),
                    convertTodo: id => dispatch(actions.convertTodo(id))
                }
            }
        }
    }
)(components.App)
