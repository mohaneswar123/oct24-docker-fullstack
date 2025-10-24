import React, { useState, useEffect } from 'react';
import taskService from './services/taskService';
import './Home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setError('Please enter a task');
      return;
    }
    try {
      setError('');
      const taskData = { item: newTask.trim() }; // changed to match backend
      await taskService.addTask(taskData);
      setNewTask('');
      setSuccess('Item added successfully!');
      loadTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to add item: ' + err.message);
    }
  };

  const handleEditTask = async (task) => {
    try {
      setError('');
      const updatedTask = { id: task.id, item: editTaskText.trim() }; // changed to match backend
      await taskService.editTask(updatedTask);
      setEditingTask(null);
      setEditTaskText('');
      setSuccess('Item updated successfully!');
      loadTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update item: ' + err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      setError('');
      await taskService.deleteTask(id);
      setSuccess('Item deleted successfully!');
      loadTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete item: ' + err.message);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditTaskText(task.item); // changed to match backend
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTaskText('');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Groceries Manager</h1>

      <div className="task-form">
        <h2>Add New Grocery Item</h2>
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <label className="form-label">Grocery Item Description:</label>
            <input
              type="text"
              className="form-input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your item here..."
              maxLength="500"
            />
          </div>
          <button type="submit" className="btn btn-primary">Add item</button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="tasks-section">
        <h2 className="section-title">All Grocery Items</h2>

        {loading ? (
          <div className="loading">Loading grocery items...</div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks">No grocery items found. Add your first item above!</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                {editingTask === task.id ? (
                  <input
                    type="text"
                    className="form-input"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    maxLength="500"
                  />
                ) : (
                  <div className="task-text">{task.item}</div>
                )}

                <div className="task-actions">
                  {editingTask === task.id ? (
                    <>
                      <button className="btn btn-success" onClick={() => handleEditTask(task)}>Save</button>
                      <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={() => startEdit(task)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="refresh-container">
        <button className="btn btn-secondary" onClick={loadTasks}>Refresh List</button>
      </div>
    </div>
  );
};

export default Home;
