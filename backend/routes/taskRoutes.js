const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// All task routes are protected - require valid JWT token
router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getMyTasks);
router.get('/:taskId', verifyToken, getTaskById);
router.put('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

module.exports = router;
