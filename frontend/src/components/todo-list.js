import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {API} from '../api-service'
import {useCookies} from 'react-cookie';

function TodoList(props) {
    
  const [token] = useCookies(['mr-token']);

  const todoClicked = todo => evt => {
      props.todoClicked(todo)
  }

  const editClicked = todo => {
    props.editClicked(todo);
  }

  const removeClicked = todo => {
    API.deleteTodo(todo._id, token['mr-token'])
    .then(() => props.removeClicked(todo))
    .catch(error => console.log(error))
  }

  return (
      <div>
          {props.todos && props.todos.length &&  props.todos.map(todo => {
            return (
              <div key={todo && todo._id} className="todo-item">
                <h2 onClick={todoClicked(todo)}>{todo && todo.desc}</h2>
                <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(todo)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(todo)} />
              </div>
            )
          })}
      </div>
  )
}

export default TodoList;