import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType } from './Types';


function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: 1, title:"js", isDone: true},
    {id: 2, title:"Html", isDone: true},
    {id: 3, title:"react", isDone: true},
    {id: 4, title:"NextJs", isDone: false},
    {id: 5, title:"Routing", isDone: false},
  ])
  const [filter, setFilter] = useState<FilteredValueType>("ALL")
  

    const onRemuveTask = (id: number) => {
      const resultTasks = tasks.filter((t:TasksType) => t.id !== id )
      setTasks(resultTasks)
    } 

    const onChangeChecked = (value:boolean, id: number) => {
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






