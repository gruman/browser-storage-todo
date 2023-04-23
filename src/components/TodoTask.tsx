import { ITask } from '../interfaces';
import { FaTrash } from 'react-icons/fa';

interface Props{
  task:ITask;
  completeTask(taskNameToDelete:string):void;
}

const TodoTask= ({task, completeTask}:Props) => {
  return (
  <div className='task'>
      <span>{task.taskName}</span>
    <FaTrash onClick={()=>{
      completeTask(task.taskName);
    }} />
  </div>
  );
}

export default TodoTask;