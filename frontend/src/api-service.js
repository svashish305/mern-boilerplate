export class API {
    static loginUser(body) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/users/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static currentLoggedInUser(token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/users/loggedin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            }).then(resp => resp.json())
    }

    static getTodos(token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            }).then(resp => resp.json())
    }
    
    static updateTodo(todo_id, body, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/${todo_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static createTodo(body, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
        .catch(err => console.log(err));
    }

    static deleteTodo(todo_id, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/${todo_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}