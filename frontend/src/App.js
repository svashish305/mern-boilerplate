import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/todo-list';
import TodoDetails from './components/todo-details';
import TodoForm from './components/todo-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie';
import {useFetch} from './hooks/useFetch';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setTodos(data)
  }, [data])

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
  }, [token])

  const loadTodo = todo => {
    setSelectedTodo(todo);
    setEditedTodo(null);
  }

  const updatedTodo = todo => {
    const newTodos = todos.map(mov => {
      if ( mov.id === todo.id) {
        return todo;
      }
      return mov;
    })
    setTodos(newTodos)
  }

  const editClicked = todo => {
    setEditedTodo(todo);
    setSelectedTodo(null);
  }

  const newTodo = () => {
    setEditedTodo({title: '', description: ''});
    setSelectedTodo(null);
  }

  const todoCreated = todo => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  }

  const removeClicked = todo => {
    const newTodos = todos.filter(td => td.id !== todo.id)
    setTodos(newTodos);
  }

  const logoutUser = () => {
    deleteToken(['mr-token']);
  }

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading todos</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span>MERN BASIC CRUD</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className="layout">
          <div>
            <TodoList todos={todos} 
              todoClicked={loadTodo} 
              editClicked={editClicked} 
              removeClicked={removeClicked}
            />
            <button onClick={newTodo}>New Todo</button>
          </div>
          <TodoDetails todo={selectedTodo} updateTodo={loadTodo} />
          {editedTodo ? 
          <TodoForm todo={editedTodo} updatedTodo={updatedTodo} todoCreated={todoCreated} />
          : null}
        </div>
    </div>
  );
}

export default App;
