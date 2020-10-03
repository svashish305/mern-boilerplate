const express = require('express');
const router = express.Router();
const authorize = require('../../middleware/authorize')
const Role = require('../../role');
const todoService = require('./todo.service');
var server = require('../../server').server;
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.patch('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);
router.patch('/:id/mark-complete', authorize(), markCompleted);
module.exports = router;

function getAll(req, res, next) {
    if(req.user.role === Role.Admin) {
        todoService.getAll()
            .then(todos => res.json(todos))
            .catch(next);
    } else if(req.user.role === Role.User) {
        todoService.todosOfUser(req.user.id)
            .then(todos => res.json(todos))
            .catch(next);
    }
}

function getById(req, res, next) {
    todoService.getById(req.params.id)
        .then(todo => (todo && (todo.userId === req.user.id || req.user.role === Role.Admin)) ? res.json(todo) : res.sendStatus(404))
        .catch(next);
}

function create(req, res, next) {
    todoService.create({...req.body, userId: req.user.id, updated: Date.now()})
        .then(todo => {
            if(res.user.role === Role.Admin) {
                res.io.sockets.emit("Todo Created!")
            }
            res.json(todo)
        })
        .catch(next);
}

function update(req, res, next) {
    todoService.update(req.params.id, req.body)
        .then(todo => {
            if(res.user.role === Role.Admin) {
                res.io.sockets.emit("Todo Emited!")
            }
            res.json(todo)
        })
        .catch(next);
}

function _delete(req, res, next) {
    todoService.delete(req.params.id)
        .then(() => res.json({ message: 'Todo deleted successfully' }))
        .catch(next);
}

function markCompleted(req, res, next) {
    todoService.markCompleted(req.params.id)
        .then(todo => {
            if(res.user.role === Role.Admin) {
                res.io.sockets.emit("Todo Completed!")
            }
            res.json(todo)
        })
        .catch(next);
}