import React, {useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';

function TodoForm(props) {
    
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    const [completed, setCompleted] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        setDesc(props.todo.desc)
        setPriority(props.todo.priority)    
        setCompleted(props.todo.completed)
    }, [props.todo])
    
    const updateClicked = () => {
        API.updateTodo(props.todo._id, {desc, priority, completed}, token['mr-token'])
        .then(resp => props.updatedTodo(resp))
        .catch(error => console.log(error))
    }

    const createClicked = () => {
        API.createTodo({desc, priority, completed}, token['mr-token'])
        .then(resp => props.todoCreated(resp))
        .catch(error => console.log(error))
    }

    const isDisabled = desc.length === 0 || priority.length === 0;

    return (
        <React.Fragment>
            { props.todo ? (
            <div>
                <label htmlFor="desc">Description</label><br />
                <input id="desc" type="text" placeholder="Description" value={desc}
                    onChange={evt => setDesc(evt.target.value)}
                /><br />
                <label htmlFor="priority">Priority</label><br />
                <textarea id="priority" type="text" placeholder="Priority" value={priority}
                onChange={evt => setPriority(evt.target.value)}></textarea><br />
                <label htmlFor="completed">Completed</label><br />
                <textarea id="completed" type="text" placeholder="Completed" value={completed}
                onChange={evt => setCompleted(evt.target.value)}></textarea><br />
                { props.todo._id ?
                    <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                    <button onClick={createClicked} disabled={isDisabled}>Create</button>
                }
            </div>
            ) : null }
        </React.Fragment>
    )
}

export default TodoForm;
