import { useState } from "react"
import Task from "../Task"
import "./Todo.css"

let count = 0;

const Todo = () => {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState(null);

  const addTask = () => {
    if (message != "") {
      setTasks(tasks => [...tasks, {id:count++, msg:message}]);
      setMessage("");
    }
  }

  const saveTask = () => {
    if (message != "") {
      setTasks(tasks => tasks.map(task => {
        if (task === item) {
          task.msg = message;
        }
        return task;
      }))
    setIsEdit(false);
    setMessage("");
    }
  }

  const deleteTask = id => setTasks(tasks => tasks.filter(task => task.id !== id));

  const editTask = (id) => {
    const item = tasks.find(task => task.id === id);
    setItem(item);
    setMessage(item.msg);
    setIsEdit(true);
  };

  const funcs = {deleteTask,editTask};
  
  return (
    <div className="card">
      <div className="header-card">
        <input className="input-task" 
        type="text" 
        placeholder="Ingrese una tarea" 
        onChange={e => setMessage(e.target.value)}
        value={message} />
        {isEdit ? 
          <button className="save-btn" type="button" onClick={saveTask}>Guardar</button> 
          :
          <button className="add-btn" type="button" onClick={addTask}>Agregar</button>
        }
      </div>
      {tasks.map(task => <Task key={task.id} {...task} {...funcs}/>)}
    </div>
  )
}

export default Todo;