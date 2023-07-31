import { useState } from 'react'
import Task from '../Task'
import './Todo.css'

const Todo = () => {
  const [task, setTask] = useState({msg:""})
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(false)

  const addTask = () => {
    if (task?.msg.trim() != "") {
      setTasks([...tasks, {id: (tasks[tasks.length - 1]?.id || 0) + 1, msg: task?.msg}]);
      setTask({msg:""}); 
    }
  }

  const saveTask = () => {
    if (task?.msg.trim() != "") {
      setTasks(prevTasks => prevTasks.map(prevTask => (prevTask.id === task.id ? {...prevTask, msg: task.msg} : prevTask)));
      setEditingTask(false);
      setTask({msg:""}); 
    }
  }

  const editTask = (id) => {
    setTask(tasks.find(task => task.id === id));
    setEditingTask(true);
  }

  const deleteTask = (id) => setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== id));

  const functions = { deleteTask, editTask };
  const buttonStyle = editingTask ? 'save-btn' : 'add-btn';
  const buttonText = editingTask ? 'Guardar' : 'Agregar';

  return (
    <div className="card">
      <div className="header-card">
        <input className="input-task" type="text" placeholder="Ingrese una tarea"
          onChange={e => setTask(prevTask => ({id:prevTask.id, msg:e.target.value}))}
          value={task?.msg}
        />
        <button className={buttonStyle} type="button" onClick={editingTask ? saveTask : addTask}>
          {buttonText}
        </button>
      </div>
      {tasks.map(task => <Task key={task.id} {...task} {...functions} />)}
    </div>
  );
}

export default Todo;