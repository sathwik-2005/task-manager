const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const newTask = await pool.query('INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [req.userId, title, description, status || 'pending', priority || 'medium', due_date || null]);
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const updatedTask = await pool.query('UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5 WHERE id = $6 AND user_id = $7 RETURNING *', [title, description, status, priority, due_date, req.params.id, req.userId]);
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [req.params.id, req.userId]);
    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;