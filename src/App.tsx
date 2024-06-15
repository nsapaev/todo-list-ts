import React from 'react';
import { TodoList } from './components/TodoList';
import { TasksType } from './Types';


const tasks1: Array<TasksType> = [
  {id: 1, title:"js", isDone: true},
  {id: 2, title:"Html", isDone: false},
  {id: 3, title:"react", isDone: false}
]

const tasks2: Array<TasksType> = [
  {id: 1, title:"eggs", isDone: true},
  {id: 2, title:"milk", isDone: true},
  {id: 3, title:"banana", isDone: false}
]




function App() {
  return (
    <div className="App">
      <TodoList title='programming' tasks={tasks1}/>
      <TodoList title='glossary list' tasks={tasks2}/>
    </div>
  );
}

export default App;






