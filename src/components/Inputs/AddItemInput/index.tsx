
import { useState,ChangeEvent } from "react"

type AddItemInputPropsType = {
    addItem: (title:string) => void
  }

export function AddItemInput({ addItem }:AddItemInputPropsType) {

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
    

    return (
        <div>
              <input 
                  className={error? "error" : "" }
                  type="text" 
                  value={value} 
                  onChange={onChange} 
                  onKeyDown={(e) => { 
                    if(e.key === "Enter"){
                      onAddItemHandler(value)
                    }
                  }}  
                /> 
                <button onClick={() => {onAddItemHandler(value)}}>+</button>
                {error && <div className="error_message">Field is required </div>}
        </div>
    )
  }