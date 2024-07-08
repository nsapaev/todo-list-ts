 
export type TodoListType = {
  id: string,
  title: string,
  filter: FilteredValueType,
  tasks: Array<TasksType>,
}


export type  TodoListPropsType = {
    todolistId:string,
    todoList: TodoListType
    title: string,
    onRemoveTaskHandler: (taskId:string, todolistId: string) => void
    onFilterHandler:(filter:FilteredValueType, todolistId: string) => void
    filter: FilteredValueType
    onChangeCheckedHandler: (value:boolean, id: string, todolistId: string) => void
    onAddTaskHandler: (task: TasksType, todolistId: string) => void
    onRemoveTodoList: (todoListId: string) => void
    onChangeTaskTitle: (title: string, todolistId: string, taskId: string) => void,
    onChangeTodoListTitle:(id:string,title:string) => void
  }

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
  }
 
export type FilteredValueType = "ALL" | "COMPLETED" | "ACTIVE"

export type UserAuthType = {
  email: null | string ;
  token: null | string;
  id: null | string;
}