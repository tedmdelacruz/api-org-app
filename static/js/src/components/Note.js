import React, { Component } from 'react'

export class Note extends Component {
    render() {
        const { id, title, text, isActive,
            actions } = this.props

        const handleClick = event => {
            actions.selectNote(id)
        }

        return (
            <div className="notes-list-item col-md-4" onClick={ handleClick }>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h4>{ title }</h4>
                        <hr/>
                        <p>{ text }</p>
                    </div>
                </div>
            </div>
        ) 
    }
}
