import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.get('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

            this.props.history.push('/');
    }

    submit = () => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: this.delete
            },
            {
              label: 'No',
              onClick: () => alert('Click No')
            }
          ]
        });
    };

    render() {
        return (
            <div className="container">
                <button onClick={this.submit} className="btn btn-danger">Delete</button>
            </div>
        )
    }
}