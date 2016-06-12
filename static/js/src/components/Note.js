import React, { Component } from 'react'

class NoteOptions extends Component {
    render() {
        const { actions } = this.props

        const handleEdit = (event) => {
            event.preventDefault()
            actions.editNote(note)
        }

        const handleDelete = (event) => {
            event.preventDefault()
            actions.deleteNote(note)
        }

        return (
            <div className="btn-group pull-right">
                <a href="#" onClick={ handleEdit } className="btn btn-default btn-sm">
                    <i className="fa fa-pencil"></i>
                </a> 
                <a href="#" onClick={ handleDelete } className="btn btn-danger btn-sm">
                    <i className="fa fa-times"></i>
                </a>
            </div>
        )
    }
}

export class Note extends Component {
    componentWillMount() {
        this.setState({
            isOptionsShown: false
        })
    }

    render() {
        const { id, title, text, isActive,
            actions } = this.props
        const note = { id, title, text }

        return (
            <div className="notes-list-item col-md-4"
                onMouseOver={ () => { this.setState({ isOptionsShown: true }) } }
                onMouseLeave={ () => { this.setState({ isOptionsShown: false }) } }>

                <div className="panel panel-default">
                    <div className="panel-body">
                        <h4>{ title }</h4>
                        <hr/>
                        <p>{ text }</p>

                        { this.state.isOptionsShown
                            ? <NoteOptions actions={ actions }/>
                            : null }
                    </div>
                </div>
            </div>
        ) 
    }
}
