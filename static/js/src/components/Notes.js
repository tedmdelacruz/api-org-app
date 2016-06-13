import React, { Component } from 'react'
import { Note } from './Note'

export class Notes extends Component {
    constructor() {
        super()
        this.state = { isCreateMode: false }
    }

    componentWillMount() {
        this.props.actions.getNotes()
    }

    componentWillReceiveProps(props) {
        this.setState({ isCreateMode: props.isCreateMode })
    }

    toggleCreateMode(event) {
        event.preventDefault()
        let { isCreateMode } = this.state
        this.setState({ isCreateMode: ! isCreateMode })
    }

    render() {
        const { isActive, actions, items } = this.props

        if ( ! isActive) {
            return null
        }

        const CreateForm = (
            <Note id={ null } title="New Note" text="" actions={ actions.noteActions }/>
        )

        return (
            <div className="tab-content">
                <div className="notes-controls">
                    <button className="btn btn-primary btn-sm" onClick={ this.toggleCreateMode.bind(this) }>
                        <i className="fa fa-plus"></i> Create New Note
                    </button>
                </div>

                <div className="row notes-list">
                    { this.state.isCreateMode
                        ? CreateForm 
                        : null }

                    { items.map((item, index) => {
                        return <Note id={ item.pk } title={ item.fields.title } text={ item.fields.text }
                            key={ index } actions={ actions.noteActions }/>
                    }) }
                </div>
            </div>
        ) 
    }
}
