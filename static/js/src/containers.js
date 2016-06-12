import { connect } from 'react-redux'
import { selectTab, createNote } from './actions/index'
import * as components from './components/App'

export const App = connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispachToProps(dispatch) {
        return {
            selectTab: (tab) => dispatch(selectTab(tab))
        }
    }
)(components.App)
