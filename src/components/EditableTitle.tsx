import React, {useState} from "react"
import TextField from '@mui/material/TextField';

type TaskTitlePropsType = {
    title: string;
    setNewTitle:(title: string) => void
  }
   
const EditableTitle = React.memo (function({title, setNewTitle}: TaskTitlePropsType ){
  
    const [taskTitleEditMode, setTaskTitleEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const [error,setError] = useState<boolean>(false)
    

    console.log("Called EditableTitle")
    return (
      <>
        {!taskTitleEditMode && <span onDoubleClick={() => {setTaskTitleEditMode(true)}} > {value} </span>}
        {taskTitleEditMode && <TextField error={error} size="small" autoFocus value={value} 
                  onBlur={() => {
                    if(value.trim() === ""){
                        setError(true)
                        return
                    }
                    setTaskTitleEditMode(false)
                    setNewTitle(value)
                  }} 
                  onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        if(value.trim() === ""){
                            setError(true)
                            return
                        }
                      setNewTitle(value)
                      setTaskTitleEditMode(false)
                    }
                  }} 
                  onChange={(e) => {
                    setError(false)
                    setValue(e.target.value)
                }} />
         }
      </>
    )
  
  })
  
  export default EditableTitle
    