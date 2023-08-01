import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Task.css';

const Task = (props) => {
  const { id, msg, deleteTask, editTask } = props;
  return (
    <div className="task">
      <p className="text">{msg}</p>
      <div>
        <button className="edit-btn" type="button" onClick={() => editTask(id)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button className="delete-btn" type="button" onClick={() => deleteTask(id)}>
          <FontAwesomeIcon icon={faTrashCan}/>
        </button>
      </div>
    </div>
  )
}

export default Task;