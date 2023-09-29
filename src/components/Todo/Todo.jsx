import { useEffect, useRef, useState } from 'react';
import {DndContext, closestCenter, useSensors, useSensor, PointerSensor} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable'
import Task from '../Task';
import './Todo.css';

const Todo = () => {
  const [ count, setCount ] = useState(1);
  const [ task, setTask ] = useState({msg:""});
  const [ tasks, setTasks ] = useState([]);
  const [ editingTask, setEditingTask ] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const validation = e => {
    e.preventDefault();
    return task?.msg.trim() != "";
  } 

  const addTask = e => {
    if (validation(e)) {
      setCount(count + 1)
      setTasks([...tasks, {id: count, msg: task?.msg}]);
      setTask({msg:''});
    }
  }

  const saveTask = e => {
    if (validation(e)) {
      setTasks(prevTasks => prevTasks.map(prevTask => (prevTask.id === task.id ? {...prevTask, msg: task.msg} : prevTask)));
      setEditingTask(false);
      setTask({msg:''});
    }
  }

  const editTask = id => {
    inputRef.current.focus();
    setTask(tasks.find(task => task.id === id));
    setEditingTask(true);
  }

  const deleteTask = id => setTasks(prevTasks => prevTasks.filter(prevTask => prevTask.id !== id));

  const handleDragEnd = (event) => {
    const {active, over} = event;
    setTasks(() => {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      return arrayMove(tasks, oldIndex, newIndex);
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const functions = { deleteTask, editTask };
  const [buttonStyle, buttonText] = editingTask ? ['save-btn', 'Guardar'] : ['add-btn', 'Agregar'];

  return (
    <div className="card">
      <h1>TODO APP</h1>
      <form className="header-card">
        <input ref={inputRef} className="input-task" type="text" placeholder="Ingrese una tarea"
          onChange={e => setTask(prevTask => ({id:prevTask.id, msg:e.target.value}))}
          value={task?.msg}
        />
        <button className={buttonStyle} type="submit" onClick={editingTask ? saveTask : addTask}>
          {buttonText}
        </button>
      </form>
      <p className="text-without-tasks" hidden={tasks.length}>No tienes tareas por el momento.</p>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map(task => <Task key={task.id} {...task} {...functions} />)}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Todo;