import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType } from './Types';
import "./App.css"
import { v4 as uuid } from 'uuid';



function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    {id: uuid(), title:"js", isDone: true},
  ])
  const [filter, setFilter] = useState<FilteredValueType>("ALL")
  

    const addTask = (task: TasksType) => {
      const resultTasks = [task, ...tasks]
      setTasks(resultTasks)
    }

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
    useEffect(() => {
      if(filter === "ALL"){
        filteredTasks = tasks.filter(t => true)
      }
      if(filter === "ACTIVE"){
        filteredTasks = tasks.filter(t => !t.isDone )
      }
      if(filter === "COMPLETED"){
        filteredTasks = tasks.filter(t => t.isDone )
      }

    }, [tasks])
   





  return (
    <div className="App">
      <TodoList 
          title='programming' 
          tasks={filteredTasks}
          onRemoveTaskHandler={onRemuveTask}
          onChangeCheckedHandler={onChangeChecked}
          onFilterHandler={setFilter}
          filter={filter}
          onAddTaskHandler={addTask}
      />
    </div>
  );
}

export default App;






