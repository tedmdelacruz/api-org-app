import React, { Component } from 'react'
import { ENTER_KEY } from '../constants'

export class Note extends Component {
    getStateFromProps(props) {
        const { id, title, text } = props

        this.setState({
            isPristine: true,
            showDelete: (id == null),
            isEditMode: (id == null),
            id, title, text 
        })
    }

    componentWillMount() {
        this.getStateFromProps(this.props)
    }

    componentWillReceiveProps(props) {
        this.getStateFromProps(props)
    }

    createOrUpdateNote(note) {
        return note.id
            ? this.props.actions.updateNote(note)
            : this.props.actions.createNote(note)
    }

    handleMouseLeave() {
        this.setState({
            showDelete: false,
            isEditMode: false
        })

        const { id, title, text,
            isEditMode, isPristine } = this.state

        if ( ! isEditMode || isPristine) {
            return
        }

        this.createOrUpdateNote({ id, title, text })
    }

    handleInputChange(event) {
        let { field } = event.target.dataset

        this.setState({
            [field]: event.target.value,
            isPristine: false
        })
    }

    handleEdit(event) {
        if (event.target.dataset.type == 'delete') {
            return
        }

        this.setState({
            showDelete: true,
            isEditMode: true,
        })
    }

    handleDelete(event) {
        this.setState({
            showDelete: false,
            isEditMode: false
        })

        const { id } = this.state
        this.props.actions.deleteNote({ id })
    }

    handleInputKeydown(event) {
        let { field } = event.target.dataset

        // In title field, update note on ENTER
        // In text field, update note on CTRL/CMD + ENTER
        if ((field == 'title' && event.keyCode == 13) ||
            (field == 'text' && event.keyCode == 13 && (event.metaKey || event.ctrlKey))) {

            const { id, title, text } = this.state
            this.createOrUpdateNote({ id, title, text })
        }
    }

    render() {
        const { id, title, text } = this.props
        const { actions } = this.props

        const DeleteBtn = (
            <div className="delete-note" onClick={ this.handleDelete.bind(this) } data-type="delete">
                <button className="close" type="close" data-type="delete">&times;</button>
            </div>
        )

        const Display = (
            <div>
                <h3>{ title }</h3>
                <p>{ text }</p>
            </div>
        )

        const Form = (
            <div>
                <input type="text" value={ this.state.title } data-field="title"
                    onChange={ this.handleInputChange.bind(this) }
                    onKeyDown={ this.handleInputKeydown.bind(this) }
                    onFocus={ (event) => { event.target.select() } }/>

                <textarea cols="30" rows="2" value={ this.state.text } data-field="text"
                    onChange={ this.handleInputChange.bind(this) }
                    onKeyDown={ this.handleInputKeydown.bind(this) }></textarea>
            </div>
        )

        return (
            <div className={ this.state.isEditMode ? "notes-list-item col-md-12 note-edit-mode" : "notes-list-item col-md-12"}
                onClick={ this.handleEdit.bind(this) }
                onMouseEnter={ () => { this.setState({ showDelete: true }) } }
                onMouseLeave={ this.handleMouseLeave.bind(this) }>

                <div className="panel panel-default">
                    <div className="panel-body">
                        { this.state.showDelete && this.state.id ? DeleteBtn : null }
                        { this.state.isEditMode ? Form : Display }  
                    </div>
                </div>
            </div>
        ) 
    }
}
