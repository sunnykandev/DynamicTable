import './EditableCell.css'
import { ChangeEventHandler, useState } from "react";

export const EditableCell = ({
    type,
    value,
    prefix, 
    onChange
}:{
    type: "string" | "int" | "float";
    value: string | number;
    prefix?:string;
    onChange:ChangeEventHandler<HTMLInputElement>;
}) => {
    const [focused, setFocused] = useState(false)
    const displayValue = () => {
        if(value){
            if(type=="string"||type=="int"){
                return value
            }else{
                return focused?
                    parseFloat(String(value)):
                    parseFloat(String(value)).toFixed(2)
            }
        }else{
            if(type=="string"||focused){
                return ''
            }else{
                return 0
            }
        }
    }
    return (
        <div className="editable-cell">
        <div>
            {prefix}
        </div>
        <div>
            <input
                type={type=="string"?"string":"number"}
                min={type=="int"?0:undefined}
                step={type=="int"?1:undefined}
                value={displayValue()}     
                onChange={onChange}
                onFocus={()=>{setFocused(true)}}
                onBlur={()=>{setFocused(false)}}
            />
        </div>
        </div>
    )
}
