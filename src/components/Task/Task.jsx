import "./Task.css"

const Task = ({id,msg,deleteTask,editTask}) => {
  return (
    <div className="task">
      <p className="text">{msg}</p>
      <div>
        <button className="edit-btn" type="button" onClick={() => editTask(id)}>Editar</button>
        <button className="delete-btn" type="button" onClick={() => deleteTask(id)}>Borrar</button>
      </div>
    </div>
  )
}

export default Task;