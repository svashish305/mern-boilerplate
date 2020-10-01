const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../middleware/validate-request');
const authorize = require('../../middleware/authorize')
const Role = require('../../role');
const todoService = require('./todo.service');

router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    todoService.getAll()
        .then(todos => res.json(todos))
        .catch(next);
}

function getById(req, res, next) {
    todoService.getById(req.params.id)
        .then(todo => (todo && (todo.userId === req.user.id || req.user.role === Role.Admin)) ? res.json(todo) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        desc: Joi.string().required(),
        priority: Joi.string().required(),
        completed: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    todoService.create({...req.body, userId: req.user.id, updated: Date.now()})
        .then(todo => res.json(todo))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = {
        desc: Joi.string().empty(''),
        priority: Joi.string().empty(''),
        completed: Joi.boolean(false)
    };
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    todoService.update(req.params.id, req.body)
        .then(todo => res.json(todo))
        .catch(next);
}

function _delete(req, res, next) {
    todoService.delete(req.params.id)
        .then(() => res.json({ message: 'Todo deleted successfully' }))
        .catch(next);
}