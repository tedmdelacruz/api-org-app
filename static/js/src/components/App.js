import React, { Component } from 'react'
import { Notes, Todo } from './index'

export class App extends Component {
    render() {
        const { app, notes, todos, selectTab, notesActions } = this.props
        const { activeTab } = app

        const handleTabClick = event => {
            event.preventDefault()
            selectTab(event.target.dataset.value)
        }

        const active = tab => {
            return (activeTab === tab) ? 'active' : null
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <ul className="nav nav-tabs">
                            <li className={ active('notes') }>
                                <a href="#" onClick={ handleTabClick } data-value="notes">
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i> Notes
                                </a>
                            </li>
                            <li className={ active('todo') }>
                                <a href="#" onClick={ handleTabClick } data-value="todo">
                                    <i className="fa fa-check-square-o" aria-hidden="true"></i> Todo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Notes isActive={ activeTab === 'notes' } actions={ notesActions } data={ notes } />
                        <Todo isActive={ activeTab === 'todo' } data={ todos }/>
                    </div>
                </div>
            </div>
        )
    }
}
