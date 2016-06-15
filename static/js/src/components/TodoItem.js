import React, { Component } from 'react'

export class TodoItem extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            text: '',
            isChecked: '',
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

    handleCheck(event) {
        this.props.toggleTodo({
            id: this.state.id,
            isChecked: event.target.checked
        })
    }

    render() {
        const { id, text, isChecked } = this.props

        const Controls = (
            <span className="btn-group">
                <a href="#" onClick={ () => {} } className="btn btn-info btn-sm">
                    <i className="fa fa-arrow-left"></i> <i className="fa fa-sticky-note"></i>
                </a>
                <a href="#" onClick={ () => {} } className="btn btn-default btn-sm"><i className="fa fa-pencil"></i></a> 
                <a href="#" onClick={ () => {} } className="btn btn-danger btn-sm">&times;</a>
            </span>
        )

        return (
            <div className={ isChecked ? 'todo-item checked text-muted' : 'todo-item' }>
                <div className="checkbox">
                    <label htmlFor={ 'todo-item-' + id }>
                        <input type="checkbox" id={ 'todo-item-' + id } checked={ this.state.isChecked }
                            onChange={ this.handleCheck.bind(this) }/>
                        <strong className="todo-item-text">{ text }</strong> 
                        { this.showControls ? Controls : null }
                    </label>
                </div>
            </div>
        )
    }
}