import { connect } from 'react-redux'
import * as actions from './actions/index'
import * as components from './components/App'

export const App = connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispachToProps(dispatch) {
        return {
            selectTab: tab => dispatch(actions.selectTab(tab)),
            notesActions: {
                createNote: form => dispatch(actions.createNote(form)),
                getNotes: () => dispatch(actions.getNotes()),
                noteActions: {
                    updateNote: note => dispatch(actions.updateNote(note)),
                    deleteNote: note => dispatch(actions.deleteNote(note)),
                }
            }
        }
    }
)(components.App)
