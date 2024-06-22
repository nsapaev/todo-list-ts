 
export type  TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>
    onRemoveTaskHandler: (id:string) => void
    onFilterHandler:(filter:FilteredValueType) => void
    filter: FilteredValueType
    onChangeCheckedHandler: (value:boolean, id: string) => void
  }

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
  }

export type FilteredValueType = "ALL" | "COMPLETED" | "ACTIVE"