const { Task } = require('../models');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // From the verified JWT token

    // Validate input
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    // Create the task in the database
    const newTask = await Task.create({
      title,
      description: description || '',
      status: 'Pending',
      userId,
    });

    return res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    console.error('Create task error:', error);
    return res.status(500).json({ error: 'Server error while creating task' });
  }
};

// Get all tasks for the logged-in user
const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id; // From the verified JWT token

    // Fetch only tasks that belong to the logged-in user
    const tasks = await Task.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks,
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    console.error('Get task error:', error);
    return res.status(500).json({ error: 'Server error while fetching task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.id;

    // Find the task
    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;

    await task.save();

    return res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error('Update task error:', error);
    return res.status(500).json({ error: 'Server error while updating task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({
      where: { id: taskId, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Delete task error:', error);
    return res.status(500).json({ error: 'Server error while deleting task' });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
