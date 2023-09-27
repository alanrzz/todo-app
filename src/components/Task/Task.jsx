import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './Task.css';

const Task = (props) => {
  const { id, msg, deleteTask, editTask } = props;
  const [checked, setChecked] = useState(false);
  const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id:id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners} className="task">
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