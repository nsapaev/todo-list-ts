
import React, { useState,ChangeEvent } from "react"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

type AddItemInputPropsType = {
    addItem: (title:string) => void
    label: string
  }




export const AddItemInput = React.memo( ({ addItem ,label }:AddItemInputPropsType) => {

    const [value , setValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setValue(e.target.value)
    }

    const onAddItemHandler = (value: string) => {
        if(value.trim() === ""){
          setError(true)
          return
        }
        addItem(value)
        setValue("")
    }
    
    console.log("Called AddItemInput")

    return (
        <div style={{display: "flex", alignItems: "center"}}>
              <TextField 
                  className={error? "error" : "" }
                  type="text" 
                  value={value} 
                  onChange={onChange} 
                  onKeyDown={(e) => { 
                    if(e.key === "Enter"){
                      onAddItemHandler(value)
                    }
                  }}  
                  label={label}
                  variant="outlined"
                  error={error}
                /> 
                <Button size="large" variant="contained"  color="primary" onClick={() => {onAddItemHandler(value)}}>+</Button>
            
        </div>
    )
  });