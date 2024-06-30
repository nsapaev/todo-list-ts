import {FilteredValueType} from "../../Types"

export type AddTodolistActionType = {
    title: string;
}

export type RemoveTodolistActionType = {
    todolistId: string;
}

export type ChangeTodolistTitleActionType = {
    todolistId: string;
    title: string;
}
 
export type FilterTodolistType = {
    todolistId: string;
    filter: FilteredValueType;
}

export type ChangeTaskTitleType = {
    title: string;
    todolistId: string;
    taskId: string;
}
export type ChangeTaskCheckedType = {
    isChecked: boolean;
    todolistId: string;
    taskId: string;
}

export type RemoveTaskType = {
    todolistId: string;
    taskId: string;
}
export type AddTaskType = {
    todolistId: string;
    task: {
        id: string,
        isDone: boolean,
        title: string,
    }
}
