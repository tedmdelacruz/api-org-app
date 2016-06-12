import React, { Component } from 'react'

export class Notes extends Component {

    handleSave() {
        const { createNote } = this.props.actions

        createNote({ hello: 'world' })
    }

    render() {
        if ( ! this.props.isActive) {
            return null
        }

        return (
            <div className="tab-content">
                <input type="text" className="large-input" placeholder="Title"/>
                <textarea name="note" id="" cols="30" rows="4" className="large-input"
                    placeholder="Take Note"></textarea>
                <button className="btn btn-primary btn-lg" onClick={ this.handleSave.bind(this) }>Save</button>
            </div>
        ) 
    }
}
