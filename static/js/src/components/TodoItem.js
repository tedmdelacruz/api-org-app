import React, { Component } from 'react'

export class TodoItem extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            text: '',
            isChecked: '',
            showControls: true
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

    handleCheck(event) {
        this.props.toggleTodo({
            id: this.state.id,
            isChecked: event.target.checked
        })
    }

    render() {
        const { id, text, isChecked } = this.props

        const Controls = (
            <div className="item-controls todo-item-controls">
                <button className="item-control">
                    <i className="fa fa-arrow-left"></i> <i className="fa fa-sticky-note"></i>
                </button>
                <button className="item-control">
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="item-control">
                    <i className="fa fa-times"></i>
                </button>
            </div>
        )

        return (
            <div className={ isChecked ? 'todo-item checked text-muted' : 'todo-item' }>
                <div className="checkbox">
                    <label htmlFor={ 'todo-item-' + id }>
                        <input type="checkbox" id={ 'todo-item-' + id } checked={ this.state.isChecked }
                            onChange={ this.handleCheck.bind(this) }/>
                        <strong className="todo-item-text">{ text }</strong> 
                        { this.state.showControls ? Controls : null }
                    </label>
                </div>
            </div>
        )
    }
}