import { ITodo } from '../interfaces';
import { FaTrash } from 'react-icons/fa';

interface Props{
  todo:ITodo;
  completeTodo(todoNameToDelete:string):void;
}

const Todo = ({todo, completeTodo}:Props) => {
  return (
  <div className="todo">
      <span>{todo.todoName}</span>
    <FaTrash onClick={()=>{
      completeTodo(todo.todoName);
    }} />
  </div>
  );
}

export default Todo;