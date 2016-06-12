import React, { Component } from 'react'

export class Notes extends Component {
    render() {
        const { isActive, createNote, data } = this.props
        let { form, entries } = data

        if ( ! isActive) {
            return null
        }

        const handleChange = (event) => {
            let { field } = event.target.dataset
            form[field] = event.target.value
        }

        const handleSave = () => {
            createNote(form)
        }

        return (
            <div className="tab-content">
                <div className="note-form">
                    <input type="text" className="large-input" placeholder="Title" onChange={ handleChange } data-field="title"/>
                    <textarea name="note" id="" cols="30" rows="4" className="large-input"
                        placeholder="Take Note" onChange={ handleChange } data-field="text"></textarea>
                    <button className="btn btn-primary btn-lg" onClick={ handleSave }>Save</button>
                </div>
            </div>
        ) 
    }
}
