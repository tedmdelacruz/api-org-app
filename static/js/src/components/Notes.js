import React, { Component } from 'react'
import { Note } from './Note'

export class Notes extends Component {

    componentWillMount() {
        this.props.actions.getNotes()
    }

    render() {
        const { isActive, actions, data } = this.props
        let { form, notes } = data

        if ( ! isActive) {
            return null
        }

        const handleChange = (event) => {
            let { field } = event.target.dataset
            form[field] = event.target.value
        }

        const handleSave = () => {
            actions.createNote(form)
        }

        return (
            <div className="tab-content">
                <div className="note-form">
                    <input type="text" className="large-input" placeholder="Title"
                        onChange={ handleChange } data-field="title"/>

                    <textarea name="note" id="" cols="30" rows="2" className="large-input"
                        placeholder="Text" onChange={ handleChange } data-field="text"></textarea>

                    <button className="btn btn-primary btn-lg" onClick={ handleSave }>Save</button>
                </div>

                <div className="row notes-list">
                    { notes.map((note, index) => {
                        return <Note id={ note.pk } title={ note.fields.title } text={ note.fields.text }
                            key={ index } actions={ actions.noteActions }/>
                    }) }
                </div>
            </div>
        ) 
    }
}
