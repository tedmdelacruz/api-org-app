import React, { Component } from 'react'
import { Notes, Todo } from './'

export class App extends Component {

    handleTabClick(event) {
        event.preventDefault()
        this.props.selectTab(event.target.dataset.value)
    }

    active(tab) {
        return (this.props.activeTab === tab)
            ? 'active'
            : null
    }

    render() {
        const { activeTab } = this.props

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-tabs">
                            <li className={ this.active('notes') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="notes">
                                    <i className="fa fa-sticky-note" aria-hidden="true"></i> Notes
                                </a>
                            </li>
                            <li className={ this.active('todo') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="todo">
                                    <i className="fa fa-check-square-o" aria-hidden="true"></i> Todo
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Notes isActive={ activeTab === 'notes' }/>
                        <Todo isActive={ activeTab === 'todo' }/>
                    </div>
                </div>
            </div>
        )
    }
}
