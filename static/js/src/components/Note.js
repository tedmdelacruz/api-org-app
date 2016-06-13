import React, { Component } from 'react'

export class Note extends Component {
    getStateFromProps(props) {
        const { id, title, text } = props

        this.setState({
            showDelete: false,
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

    handleMouseLeave() {
        this.setState({
            showDelete: false,
            isEditMode: false
        })

        const { id, title, text, isEditMode } = this.state
        if ( ! isEditMode || ! id) {
            return
        }
        const note = { id, title, text }
        this.props.actions.updateNote(note)
    }

    render() {
        const { id, title, text } = this.props
        const { actions } = this.props
        let note = { id, title, text }

        const handleInputChange = event => {
            let { field } = event.target.dataset

            this.setState({
                [field]: event.target.value
            })
        }

        const handleInputKeydown = event => {
            let { field } = event.target.dataset

            // In title field, update note on ENTER
            // In text field, update note on CTRL/CMD + ENTER
            if ((field == 'title' && event.keyCode == 13) ||
                (field == 'text' && event.keyCode == 13 && (event.metaKey || event.ctrlKey))) {

                const { id, title, text } = this.state
                const note = { id, title, text }
                actions.updateNote(note)
            }
        }

        const handleEdit = event => {
            if (event.target.dataset.type == 'delete') {
                return
            }

            this.setState({ isEditMode: true })
        }

        const handleDelete = event => {
            this.setState({
                showDelete: false,
                isEditMode: false
            })
            actions.deleteNote(note)
        }

        const DeleteBtn = (
            <div className="delete-note" onClick={ handleDelete } data-type="delete">
                <button className="close" type="close" data-type="delete">&times;</button>
            </div>
        )

        const Display = (
            <div>
                <h3>{ note.title }</h3>
                <p>{ note.text }</p>
            </div>
        )

        const Form = (
            <div>
                <input type="text" value={ this.state.title } data-field="title"
                    onChange={ handleInputChange } onKeyDown={ handleInputKeydown }/>

                <textarea cols="30" rows="2" value={ this.state.text } data-field="text"
                    onChange={ handleInputChange } onKeyDown={ handleInputKeydown }></textarea>
            </div>
        )

        return (
            <div className="notes-list-item col-md-12"
                onClick={ handleEdit }
                onMouseEnter={ () => { this.setState({ showDelete: true }) } }
                onMouseLeave={ this.handleMouseLeave.bind(this) }>

                <div className="panel panel-default">
                    <div className="panel-body">
                        { this.state.showDelete ? DeleteBtn : null }
                        { this.state.isEditMode ? Form : Display }  
                    </div>
                </div>
            </div>
        ) 
    }
}
