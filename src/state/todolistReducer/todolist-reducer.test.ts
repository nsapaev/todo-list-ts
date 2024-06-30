import { v4 as uuid } from 'uuid';
import { TodoListType } from "../../Types"
import { todolistReducer,addTodolistActionCreater, removeTodolistActionCreater,changeTodolistTitleActionCreater, filterTodolistTitleActionCreater, changeTaskTitleActionCreater,changeTaskChekedActionCreator,removeTaskActionCreater,addTaskActionCreater } from "./index"
import {ActionSType} from "./index"

test("add todolist", () => {
    const id1 = uuid()
    const id2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
  ]

    const newTodolistValue = "Home work"

    const action:ActionSType = addTodolistActionCreater( "Home work") 
     

    const endState = todolistReducer(startState, action)
    

    expect(endState[0].title).toBe(newTodolistValue)
    
})
test("remove todolist", () => {
    const id1 = uuid()
    const id2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
  ]

    const newTodolistValue = "Home work"

    const action:ActionSType = removeTodolistActionCreater(id1)

    const endState = todolistReducer(startState, action)
    

    expect(endState.length).toBe(1)
    
})
test("change todolist title" , () => {
    const id1 = uuid()
    const id2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
  ]

    const newTodolistTitle = "holla"

    const action: ActionSType = changeTodolistTitleActionCreater(id1, newTodolistTitle)

    const endState = todolistReducer(startState, action)
    
    expect(endState[0].title).toBe(newTodolistTitle)
    
})
test("filter todolist " , () => {
    const id1 = uuid()
    const id2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: uuid(), title:"js", isDone: true}] },
  ]
    
    const newFilter = "COMPLETED"
    const action: ActionSType = filterTodolistTitleActionCreater(id1,newFilter )

    const endState = todolistReducer(startState, action)
    
    console.log(endState)
    expect(endState[0].filter).toBe(newFilter)
    
})
test("change task title" , () => {
    const id1 = uuid()
    const id2 = uuid()
    const taskTitle1 = uuid()
    const taskTitle2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: taskTitle1, title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: taskTitle2, title:"js", isDone: true}] },
  ]
    
    const newFilter = "title"
    const action: ActionSType = changeTaskTitleActionCreater(newFilter, id1, taskTitle1 ) 

    const endState = todolistReducer(startState, action)
    
    console.log(endState)
    expect(endState[0].tasks[0].title).toBe(newFilter)
    
})
test("change task checked" , () => {
    const id1 = uuid()
    const id2 = uuid()
    const taskTitle1 = uuid()
    const taskTitle2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: taskTitle1, title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: taskTitle2, title:"js", isDone: true}] },
  ]
    
    const isChecked = false
    const action: ActionSType = changeTaskChekedActionCreator(isChecked, id1,  taskTitle1 ) 

    const endState = todolistReducer(startState, action)
    
    console.log(endState)
    expect(endState[0].tasks[0].isDone).toBe(isChecked)
    
})
test("remove todolist id" , () => {
    const id1 = uuid()
    const id2 = uuid()
    const taskTitle1 = uuid()
    const taskTitle2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: taskTitle1, title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: taskTitle2, title:"js", isDone: true}] },
  ]
    
    const isChecked = false
    const action: ActionSType = removeTaskActionCreater(id1,  taskTitle1 ) 

    const endState = todolistReducer(startState, action)
    
    console.log(endState)
    expect(endState[0].tasks.length).toBe(0)
    
})
test("add task" , () => {
    const id1 = uuid()
    const id2 = uuid()
    const taskTitle1 = uuid()
    const taskTitle2 = uuid()
    const startState: Array<TodoListType> = [ 
    {id: id1, title: "Glossary list", filter:"ALL", tasks: [ {id: taskTitle1, title:"js", isDone: true}] },
    {id: id2, title: "Programming", filter:"ALL", tasks: [ {id: taskTitle2, title:"js", isDone: true}] },
  ]
    
    const isChecked = false
    const action: ActionSType = addTaskActionCreater(id1, {id: uuid(),isDone:false, title: "new task" }  ) 

    const endState = todolistReducer(startState, action)
    
    console.log(endState)
    expect(endState[0].tasks[0].title).toBe("new task")
    
})



