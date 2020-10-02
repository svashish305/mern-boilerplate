import React, {useState} from 'react';
import {useCookies} from 'react-cookie';

function TodoDetails(props) {

    const [token] = useCookies(['mr-token']);

    let td = props.todo;

    const getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/todos/${td.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token['mr-token']}`
            }
        })
        .then(resp => resp.json())
        .then(resp => props.updateTodo(resp))
        .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            { td ? (
                <div>
                    <h1>{td.desc}</h1>
                    <p>{td.priority}</p>
                    <p>{td.completed}</p>
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default TodoDetails;