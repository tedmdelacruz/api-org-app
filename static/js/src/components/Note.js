import React, { Component } from 'react'
import { ENTER_KEY } from '../constants'

export class Note extends Component {
    getStateFromProps(props) {
        const { id, title, text } = props

        this.setState({
            isPristine: true,
            showControls: (id == null),
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
            showControls: false,
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
            showControls: false,
            isEditMode: true,
        })
    }

    handleDelete(event) {
        this.setState({
            showControls: false,
            isEditMode: false
        })

        this.props.actions.deleteNote(this.state.id)
    }

    handleConvert(event) {

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

        const Controls = (
            <div className="item-controls note-controls">
                <button className="item-control" onClick={ this.handleDelete.bind(this) } data-type="delete">
                    <i className="fa fa-times"></i>
                </button>
                <button className="item-control" onClick={ this.handleConvert.bind(this) } data-type="convert">
                    <i className="fa fa-check-square-o"></i> <i className="fa fa-arrow-right"></i>
                </button>
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
                onMouseEnter={ () => { this.setState({ showControls: true }) } }
                onMouseLeave={ this.handleMouseLeave.bind(this) }>

                <div className="panel panel-default">
                    <div className="panel-body">
                        { this.state.showControls && this.state.id ? Controls : null }
                        { this.state.isEditMode ? Form : Display }  
                    </div>
                </div>
            </div>
        ) 
    }
}
