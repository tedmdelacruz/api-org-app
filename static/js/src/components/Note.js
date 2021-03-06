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

    createOrUpdateNote() {
        const { id, title, text } = this.state
        return id
            ? this.props.actions.updateNote({ id, title, text})
            : this.props.actions.createNote({ title, text })
    }

    handleMouseLeave() {
        this.setState({
            showControls: false,
            isEditMode: false
        })

        const { isEditMode, isPristine } = this.state

        if ( ! isEditMode || isPristine) {
            return
        }

        this.createOrUpdateNote()
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

    handleDelete() {
        this.setState({
            showControls: false,
            isEditMode: false
        })

        this.props.actions.deleteNote(this.state.id)
    }

    handleConvert() {
        this.props.actions.convertNote(this.state.id)
    }

    handleInputKeydown(event) {
        let { field } = event.target.dataset

        // In title field, save note on ENTER
        // In text field, save note on CTRL/CMD + ENTER
        if ((field == 'title' && event.keyCode == ENTER_KEY) ||
            (field == 'text' && event.keyCode == ENTER_KEY && (event.metaKey || event.ctrlKey))) {

            this.createOrUpdateNote()
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
                    <i className="fa fa-arrow-right"></i> <i className="fa fa-check-square-o"></i>
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
