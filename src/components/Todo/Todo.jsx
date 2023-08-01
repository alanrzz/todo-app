import { useRef, useState } from 'react'
import Task from '../Task'
import './Todo.css'

const Todo = () => {
  const [task, setTask] = useState({msg:""})
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(false)
  const inputRef = useRef();

  const validation = e => {
    e.preventDefault();
    return task?.msg.trim() != "";
  } 

  const addTask = e => {
    if (validation(e)) {
      setTasks([...tasks, {id: (tasks[tasks.length - 1]?.id || 0) + 1, msg: task?.msg}]);
      setTask({msg:''})
    }
  }

  const saveTask = e => {
    if (validation(e)) {
      setTasks(prevTasks => prevTasks.map(prevTask => (prevTask.id === task.id ? {...prevTask, msg: task.msg} : prevTask)))
      setEditingTask(false);
      setTask({msg:''})
    }
  }

  const editTask = id => {
    inputRef.current.focus();
    setTask(tasks.find(task => task.id === id));
    setEditingTask(true);
  }

  const deleteTask = id => setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== id));

  const functions = { deleteTask, editTask };
  const [buttonStyle, buttonText] = editingTask ? ['save-btn', 'Guardar'] : ['add-btn', 'Agregar'];

  return (
    <div className="card">
      <form className="header-card">
        <input ref={inputRef} className="input-task" type="text" placeholder="Ingrese una tarea"
          onChange={e => setTask(prevTask => ({id:prevTask.id, msg:e.target.value}))}
          value={task?.msg}
        />
        <button className={buttonStyle} type="submit" onClick={editingTask ? saveTask : addTask}>
          {buttonText}
        </button>
      </form>
      {tasks.map(task => <Task key={task.id} {...task} {...functions} />)}
    </div>
  );
}

export default Todo;