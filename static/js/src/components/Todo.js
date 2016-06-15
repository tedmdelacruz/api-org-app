import React, { Component } from 'react'
import { ENTER_KEY } from '../constants'

class TodoItem extends Component {
    constructor() {
        super()
        this.state = {
            id: null,
            text: '',
            isChecked: ''
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
        return (
            <div className={ isChecked ? 'todo-item checked' : 'todo-item' }>
                <div className="checkbox">
                    <label htmlFor={ 'todo-item-' + id }>
                        <input type="checkbox" id={ 'todo-item-' + id } checked={ this.state.isChecked }
                            onChange={ this.handleCheck.bind(this) }/>
                        <strong className="todo-item-text">{ text }</strong>
                    </label>
                </div>
            </div>
        )
    }
}

export class Todo extends Component {
    constructor() {
        super()
        this.state = {
            text: ''
        }
    }

    componentWillMount() {
        this.props.actions.getTodos()
    }

    handleInputKeydown(event) {
        if (event.keyCode == ENTER_KEY) {
            this.props.actions.createTodo(this.state.text)
            this.setState({ text: '' })
        }
    }

    handleInputChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        let { isActive, items, actions } = this.props

        if ( ! isActive) {
            return null
        }

        return (
            <div className="tab-content">
                <input type="text" className="large-input" value={ this.state.text } placeholder="New Todo"
                    onKeyDown={ this.handleInputKeydown.bind(this) }
                    onChange={ this.handleInputChange.bind(this) }/>

                <div className="todo-list">
                    { items.map((item, index) => {
                        return <TodoItem key={ index } id={ item.id } text={ item.text }
                            isChecked={ item.isChecked } toggleTodo={ actions.toggleTodo }/>
                    }) }
                </div>
            </div>
        ) 
    }
}

