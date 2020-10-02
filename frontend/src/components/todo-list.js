import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {API} from '../api-service'
import {useCookies} from 'react-cookie';

function TodoList(props) {
    
  const [token] = useCookies(['mr-token']);

  const movieClicked = todo => evt => {
      props.movieClicked(todo)
  }

  const editClicked = todo => {
    props.editClicked(todo);
  }

  const removeClicked = todo => {
    API.deleteTodo(todo.id, token['mr-token'])
    .then(() => props.removeClicked(todo))
    .catch(error => console.log(error))
  }

  return (
      <div>
          {props.todos && props.todos.map(todo => {
            return (
              <div key={todo.id} className="todo-item">
                <h2 onClick={movieClicked(todo)}>{todo.title}</h2>
                <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(todo)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(todo)} />
              </div>
            )
          })}
      </div>
  )
}

export default TodoList;