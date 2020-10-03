import React, {useState, useEffect} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import TodoList from './components/todo-list';
import TodoDetails from './components/todo-details';
import TodoForm from './components/todo-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie';
import {useFetch} from './hooks/useFetch';
import role from './role';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [data, loggedInUser, loading, error] = useFetch();
  const [socketResponse, setSocketResponse] = useState("");

  useEffect(() => {
    setTodos(data)
  }, [data])

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
  }, [token])

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("createdTodo", d => {
      console.log(d)
      setSocketResponse(d);
    });
    setSocketResponse('');
    socket.on("updatedTodo", d => {
      console.log(d)
      setSocketResponse(d);
    });
    setSocketResponse('');
    socket.on("completedTodo", d => {
      console.log(d)
      setSocketResponse(d);
    });
  }, []);

  const loadTodo = todo => {
    setSelectedTodo(todo);
    setEditedTodo(null);
  }

  const updatedTodo = todo => {
    const newTodos = todos.map(td => {
      if ( td._id === todo._id) {
        return todo;
      }
      return td;
    })
    setTodos(newTodos)
  }

  const editClicked = todo => {
    setEditedTodo(todo);
    setSelectedTodo(null);
  }

  const newTodo = () => {
    setEditedTodo({desc: '', priority: '', completed: false});
    setSelectedTodo(null);
  }

  const todoCreated = todo => {
    const newTodos = [...todos, todo];  
    setTodos(newTodos);
  }

  const removeClicked = todo => {
    const newTodos = todos.filter(td => td._id !== todo._id)
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
          <h1>Hi {loggedInUser.email}!</h1>
          <br></br>
          <div>
            {todos ? <TodoList todos={todos} 
              todoClicked={loadTodo} 
              editClicked={editClicked} 
              removeClicked={removeClicked}
            /> : null}
            <button onClick={newTodo}>New Todo</button>
          </div>
          <TodoDetails todo={selectedTodo} updateTodo={loadTodo} />
          {editedTodo ? 
          <TodoForm todo={editedTodo} updatedTodo={updatedTodo} todoCreated={todoCreated} />
          : null}
          <br></br>
          {loggedInUser.role===role.Admin ? <p>Socket Response : {socketResponse}</p> : null}
        </div>
    </div>
  );
}

export default App;
