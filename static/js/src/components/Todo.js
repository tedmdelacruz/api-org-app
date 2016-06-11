import React, { Component } from 'react'

export class Todo extends Component {
    render() {
        if ( ! this.props.isActive) {
            return null
        }

        return (
            <div className="tab-content">
                <input type="text" className="large-input" placeholder="New Todo"/>
            </div>
        ) 
    }
}
