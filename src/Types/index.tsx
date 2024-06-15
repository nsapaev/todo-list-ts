 
export type  TodoListPropsType = {
    title: string,
    tasks: Array<TasksType>
  }

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
  }