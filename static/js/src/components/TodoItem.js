import React, { Component } from 'react'
import { ENTER_KEY } from '../constants'

export class TodoItem extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            text: '',
            isChecked: '',
            isEditMode: false,
            showControls: false
        }
    }

    getStateFromProps(props) {
        const { id, text, isChecked } = props
        this.setState({ id, text, isChecked }) 
    }

    componentWillMount() {
        this.getStateFromProps(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.getStateFromProps(newProps)
    }

    handleToggle(event) {
        this.props.actions.toggleTodo({
            id: this.state.id,
            isChecked: event.target.checked
        })
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    handleTextKeyDown(event) {
        if (event.keyCode == ENTER_KEY) {
            const { id, text, isChecked } = this.state
            this.props.actions.updateTodo({ id, text, isChecked })
            this.setState({ isEditMode: false })
        }
    }

    handleEditToggle() {
        this.setState({
            isEditMode: ! this.state.isEditMode,
            showControls: ! this.state.showControls
        })
    }

    handleDelete() {
        this.props.actions.deleteTodo(this.state.id)
    }

    render() {
        const { id, text, isChecked } = this.props

        const Form = (
            <span>
                <input type="text" value={ this.state.text }
                    onChange={ this.handleTextChange.bind(this) }
                    onKeyDown={ this.handleTextKeyDown.bind(this) }
                    onClick={ event => { event.target.select() } }/>

                <div className="item-controls todo-item-controls" data-type="edit-close">
                    <button className="item-control" onClick={ this.handleEditToggle.bind(this) }>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
            </span>
        )

        const Display = (
            <label htmlFor={ 'todo-item-' + id }>
                <input type="checkbox" id={ 'todo-item-' + id } checked={ this.state.isChecked }
                    onChange={ this.handleToggle.bind(this) } data-type="toggle"/>
                <strong className="todo-item-text" data-type="toggle">{ text }</strong>
            </label>
        )

        const Controls = (
            <div className="item-controls todo-item-controls">
                <button className="item-control">
                    <i className="fa fa-sticky-note"></i> <i className="fa fa-arrow-left"></i>
                </button>
                <button className="item-control" onClick={ this.handleEditToggle.bind(this) }>
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="item-control" onClick={ this.handleDelete.bind(this) }>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        )

        return (
            <div className={ isChecked ? 'todo-item checked text-muted' : 'todo-item' }
                onMouseEnter={ () => { this.setState({ showControls: true }) } }
                onMouseLeave={ () => { this.setState({ showControls: false }) } }>

                <div className="checkbox">
                    { this.state.isEditMode ? Form : Display }
                    { this.state.showControls ? Controls : null }
                </div>
            </div>
        )
    }
}