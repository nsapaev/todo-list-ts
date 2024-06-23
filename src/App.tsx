import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType,TodoListType } from './Types';
import "./App.css"
import { v4 as uuid } from 'uuid';



function App() {


  const [todolist, setTodoList] = useState<Array<TodoListType>>([
    {id: uuid(), title: "Glossary list", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
    {id: uuid(), title: "Programming", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },

  ])


    const addTask = (task: TasksType, todolistId: string) => {
      const filterTodolist = todolist.find(tl => tl.id === todolistId )
      if (filterTodolist) {
        filterTodolist.tasks.unshift(task)
        setTodoList([...todolist])
      }
      
    }

    const onRemuveTask = (taskId: string, todolistId: string) => {
      const filteredTodoList = todolist.find(tl => tl.id === todolistId)
      if (filteredTodoList){
          const filterTasks = filteredTodoList.tasks.filter(t => t.id !== taskId)
          filteredTodoList.tasks = [...filterTasks]
          setTodoList([...todolist])
      }
    } 

    const onChangeChecked = (value:boolean, id: string, todolistId:string) => {

      const filterTodoList =  todolist.find(tl => tl.id === todolistId )
      if(filterTodoList){
        const resultTasks = filterTodoList.tasks.map((t: TasksType) => {
          if(t.id === id){
            return { ...t, isDone: value } 
          }else{
            return { ...t }
          }}
        );
        filterTodoList.tasks = [...resultTasks]
        setTodoList([...todolist])
      }
      
    }

    const onFilterHandler = (filter: FilteredValueType, todolistId: string) => {
      const filterTodoList = todolist.find(tl => tl.id === todolistId)
      if (filterTodoList) {
        filterTodoList.filter = filter
        setTodoList([...todolist])
      }
    };
   



  return (
    <div className="App">
      {todolist.map((tl:TodoListType ) => {

          let filteredTasks = tl.tasks;

          if (tl.filter === 'ACTIVE') {
            filteredTasks = tl.tasks.filter(t => !t.isDone);
          }
          if (tl.filter === 'COMPLETED') {
            filteredTasks = tl.tasks.filter(t => t.isDone);
          }

        return  <TodoList
                    key={tl.id}
                    todolistId={tl.id} 
                    title={tl.title} 
                    tasks={filteredTasks}
                    onRemoveTaskHandler={onRemuveTask}
                    onChangeCheckedHandler={onChangeChecked}
                    onFilterHandler={onFilterHandler}
                    filter={tl.filter}
                    onAddTaskHandler={addTask}
                />
      })}
     
    </div>
  );
}

export default App;






