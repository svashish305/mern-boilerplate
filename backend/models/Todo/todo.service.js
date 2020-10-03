const db = require('../../db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    todosOfUser
};

async function getAll() {
    const todos = await db.Todo.find();
    return todos;
}

async function getById(id) {
    const todo = await db.Todo.findById(id);
    return todo;
}

async function create(params) {
    const todo = new db.Todo(params);
    await todo.save();
    return todo;
}

async function update(id, params) {
    const todo = await getById(id);

    Object.assign(todo, params);
    todo.updated = Date.now();
    await todo.save();

    return todo;
}

async function _delete(id) {
    const todo = await getById(id);
    await todo.remove();
}

async function todosOfUser(user_id) {
    const todos = await db.Todo.find({userId: user_id});
    return todos;
}