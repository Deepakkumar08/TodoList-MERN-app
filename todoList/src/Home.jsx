import React, { useEffect, useState } from "react";
import Create from "./Create";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
function Home(){

    const [todos,setTodos] = useState([]);

    const handleEdit =(id, to)=>{
        console.log(todos,'toooooo')

        axios.put('http://localhost:3001/update/'+id, to)
        .then(result =>
             setTodos(todos.map(todo=> todo._id === result.data._id ? { ...todo,'done': result.data.done} : todo))
            )
        .catch(err => console.log(err))
        }
    const handleDelete =(id)=>{
            axios.delete('http://localhost:3001/delete/'+id)
            .then(result =>
                 setTodos(todos.filter(todo => todo._id !==  result.data._id))
            )
            .catch(err => console.log(err))
            }    

    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result=> setTodos(result.data))
        .catch(err => console.log(err))
    },[])

    return(
        <div className="home">
        <h2>To Do List App </h2>
        <Create setTodos={setTodos} todos={todos}/>
        {
            todos.length===0 ? 
                <div><h2 className="no-records">No Records</h2></div>
                 : 
                todos.map(to=>(
                    <>          
                      <div className="row">
                            <span onClick={()=> handleEdit(to._id, to)}> {to.done ?  
                                <CheckCircleIcon></CheckCircleIcon>: <Brightness1Icon></Brightness1Icon>
                                } </span>
                            <p className= { to.done ? 'textstrike': ''}>{to.task}</p>  
                            <span onClick={()=>handleDelete(to._id)} ><DeleteIcon></DeleteIcon></span>
                        </div>
                        </>
            ))
        }
        </div>
    )
}

export default Home