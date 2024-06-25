 
export type TodoListType = {
  id: string,
  title: string,
  filter: FilteredValueType,
  tasks: Array<TasksType>,
}


export type  TodoListPropsType = {
    todolistId:string,
    title: string,
    tasks: Array<TasksType>
    onRemoveTaskHandler: (taskId:string, todolistId: string) => void
    onFilterHandler:(filter:FilteredValueType, todolistId: string) => void
    filter: FilteredValueType
    onChangeCheckedHandler: (value:boolean, id: string, todolistId: string) => void
    onAddTaskHandler: (task: TasksType, todolistId: string) => void
    onRemoveTodoList: (todoListId: string) => void
    onChangeTaskTitle: (title: string, todolistId: string, taskId: string) => void
  }

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
  }

export type FilteredValueType = "ALL" | "COMPLETED" | "ACTIVE"