import React, { useState } from "react";
import axios from 'axios';  
function Create(props){
    console.log(props,'pppppp')
    const [task,setTask] =useState('')
    const onkey = () => {

    }
    const handleAdd =()=>{
        if(task.length===0 ){
            alert('Edhana Type panra modha pundaa....')
            return
        }
        else{
        let ret = false;
        props.todos.map(todo=> todo.task ===task ? ret= true : ret) 
        if(ret){
            alert('Pudhusa edhuna type panra pool....')
            return  
        }
        axios.post('http://localhost:3001/add', {task: task})
        .then(result => {
            props.setTodos([...props.todos,result.data])
            console.log(props,'todoss')
        })
        .catch(err => console.log(err))
        }
    }
    return(
        <>
        <input type = 'text' name='' id="" className="inp" placeholder="Enter a value"  onkeydown={(e)=>{onkey(e)}} onChange={(e)=>setTask(e.target.value)}></input>
        <button type="button" className="btn" onClick={()=>handleAdd()}> Click to Add</button>
        </>
    )
}
export default Create;