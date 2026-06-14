import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const priorityColors = { low: '#48bb78', medium: '#ed8936', high: '#e53e3e' };
const statusColors = { pending: '#a0aec0', 'in-progress': '#4299e1', completed: '#48bb78' };

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'pending', priority: 'medium', due_date: '' });
  const [editingId, setEditingId] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'pending', priority: 'medium', due_date: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/tasks/${editingId}`, formData);
      } else {
        await API.post('/tasks', formData);
      }
      resetForm();
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      due_date: task.due_date ? task.due_date.split('T')[0] : ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '30px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#2d3748' }}>Welcome, {user?.name}</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#e53e3e', padding: '8px 16px' }}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px 12px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{ width: '100%', padding: '10px 12px', resize: 'vertical' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <select name="status" value={formData.status} onChange={handleChange} style={{ flex: '1', minWidth: '120px', padding: '10px' }}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange} style={{ flex: '1', minWidth: '120px', padding: '10px' }}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            style={{ flex: '1', minWidth: '140px', padding: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '10px 24px' }}>
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: '10px 24px', backgroundColor: '#a0aec0' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 && (
        <p style={{ color: '#718096', textAlign: 'center', padding: '20px' }}>No tasks yet. Add one above!</p>
      )}
      {tasks.map((task) => (
        <div key={task.id} style={{ background: 'white', padding: '16px', marginBottom: '12px', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ color: '#2d3748', marginBottom: '6px' }}>{task.title}</h4>
            <span style={{ backgroundColor: statusColors[task.status], color: 'white', fontSize: '12px', padding: '3px 10px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
              {task.status}
            </span>
          </div>
          {task.description && <p style={{ color: '#718096', marginBottom: '8px' }}>{task.description}</p>}
          <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '10px' }}>
            Priority: <strong style={{ color: priorityColors[task.priority] }}>{task.priority}</strong>
            {task.due_date && ` | Due: ${task.due_date.split('T')[0]}`}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => handleEdit(task)} style={{ padding: '6px 16px', fontSize: '13px' }}>Edit</button>
            <button onClick={() => handleDelete(task.id)} style={{ padding: '6px 16px', fontSize: '13px', backgroundColor: '#e53e3e' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;