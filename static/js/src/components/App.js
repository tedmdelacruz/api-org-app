import React, { Component } from 'react'
import { Notes, Todo } from './'

export class App extends Component {

    handleTabClick(event) {
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
                        <ul className="nav nav-tabs nav-justified">
                            <li className={ this.active('notes') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="notes">Notes</a>
                            </li>
                            <li className={ this.active('todo') }>
                                <a href="#" onClick={ this.handleTabClick.bind(this) } data-value="todo">Todo</a>
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
