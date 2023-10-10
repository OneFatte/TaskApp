const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/TaskControllers');


router.get('/', taskControllers.getAllTask);

router.get('/:id', taskControllers.getTask);

router.post('/', taskControllers.insertTask);

router.patch('/:id', taskControllers.updateTask);

router.delete('/:id', taskControllers.removeTask);

module.exports = router;
