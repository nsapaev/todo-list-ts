import {FilteredValueType} from "../../Types"

export type AddTodolistActionType = {
    type: "ADD-TODOLIST";
    value: string;
}

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST";
    id: string;
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE";
    id: string;
    title: string;
}
 
export type FilterTodolistType = {
    type: "FILTER-TODOLIST";
    id: string;
    filter: FilteredValueType;
}

export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE";
    title: string;
    todolistId: string;
    taskId: string;
}
export type ChangeTaskCheckedType = {
    type: "CHANGE-TASK-CHECKED";
    isChecked: boolean;
    todolistId: string;
    taskId: string;
}

export type RemoveTaskType = {
    type: "REMOVE-TASK";
    todolistId: string;
    taskId: string;
}
export type AddTaskType = {
    type: "ADD-TASK";
    todolistId: string;
    task: {
        id: string,
        isDone: boolean,
        title: string,
    }
}
