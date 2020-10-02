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

    static getTodos(token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
            }).then(resp => {
                console.log('todos ', resp)
                resp.json()
            }
                )
    }
    
    static updateTodo(todo_id, body, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/${todo_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static createTodo(body, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static deleteTodo(todo_id, token) {
        return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${todo_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }
}