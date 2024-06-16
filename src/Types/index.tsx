 
export type  TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>
    onRemoveTaskHandler: (id:number) => void
    onFilterHandler:(filter:FilteredValueType) => void
    filter: FilteredValueType
    onChangeCheckedHandler: (value:boolean, id: number) => void
  }

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
  }

export type FilteredValueType = "ALL" | "COMPLETED" | "ACTIVE"