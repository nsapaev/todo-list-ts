import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType } from './Types';
import "./App.css"
import { v4 as uuid } from 'uuid';



function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: uuid(), title:"js", isDone: true},
    {id: uuid(), title:"Html", isDone: true},
    {id: uuid(), title:"react", isDone: true},
    {id: uuid(), title:"NextJs", isDone: false},
    {id: uuid(), title:"Routing", isDone: false},
  ])
  const [filter, setFilter] = useState<FilteredValueType>("ALL")
  

    const onRemuveTask = (id: string) => {
      const resultTasks = tasks.filter((t:TasksType) => t.id !== id )
      setTasks(resultTasks)
    } 

    const onChangeChecked = (value:boolean, id: string) => {
      const resultTasks = tasks.map((t: TasksType) => {
        if(t.id === id){
          return { ...t, isDone: value } 
        }else{
          return { ...t }
        }}
      );

      setTasks(resultTasks)
    }

    let filteredTasks = tasks
    if(filter === "ALL"){
        filteredTasks = tasks.filter(t => true)
    }
    if(filter === "ACTIVE"){
      filteredTasks = tasks.filter(t => !t.isDone )
    }
    if(filter === "COMPLETED"){
      filteredTasks = tasks.filter(t => t.isDone )
    }





  return (
    <div className="App">
      <TodoList 
          title='programming' 
          tasks={filteredTasks}
          onRemoveTaskHandler={onRemuveTask}
          onChangeCheckedHandler={onChangeChecked}
          onFilterHandler={setFilter}
          filter={filter}

      />
    </div>
  );
}

export default App;






