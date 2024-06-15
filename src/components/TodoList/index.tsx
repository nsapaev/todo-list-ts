
import { TodoListPropsType } from "../../Types" 


export function TodoList ({title, tasks}: TodoListPropsType ){
    return (
      <div style={{border: "1px solid black"}}> 
          <div> {title} </div>
          <div>
              <input type="text" /> 
              <button>+</button>
          </div>
          <ul>
            <li><input type="checkbox" checked={tasks[0].isDone} /> <span> {tasks[0].title} </span></li>
            <li><input type="checkbox" checked={tasks[1].isDone} /> <span> {tasks[1].title} </span></li>
            <li><input type="checkbox" checked={tasks[2].isDone} /> <span> {tasks[2].title} </span></li>
          </ul>
  
      </div>
    )
  }