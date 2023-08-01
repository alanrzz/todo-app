import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './Task.css';

const Task = (props) => {
  const { id, msg, deleteTask, editTask } = props;
  const [checked, setChecked] = useState(false);

  return (
    <div className="task">
      <p className={checked ? "checked-text" : "text"}>{msg}</p>
      <div className="task-right-section">
        <input className="complete-task-checkbox" type="checkbox" onClick={e => setChecked(e.target.checked)} />
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