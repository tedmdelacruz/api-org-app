import React, { Component } from 'react'
import { Notes, Todo } from './index'

export class App extends Component {
    handleTabClick(event) {
        event.preventDefault()
        this.props.selectTab(event.target.dataset.value)
    }

    render() {
        const { app, notes, todos, notesActions, todoActions } = this.props
        const { activeTab } = app

        const active = tab => {
            return (activeTab === tab) ? 'active' : null
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <ul className="nav nav-tabs nav-justified">
                            <li className={ active('notes') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="notes">
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i> Notes
                                </a>
                            </li>
                            <li className={ active('todo') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="todo">
                                    <i className="fa fa-check-square-o" aria-hidden="true"></i> Todo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Notes isActive={ activeTab === 'notes' } actions={ notesActions } items={ notes.items } isCreateMode={ notes.isCreateMode }/>
                        <Todo isActive={ activeTab === 'todo' } actions={ todoActions } items={ todos.items }/>
                    </div>
                </div>
            </div>
        )
    }
}
