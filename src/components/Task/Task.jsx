import "./Task.css"

const Task = (props) => {
  return (
    <div className="task">
      <p className="text">{props.msg}</p>
      <button className="delete-btn" type="button" onClick={(e) => props.tasks(props.msg)}>Eliminar</button>
    </div>
  )
}

export default Task;