const express =  require('express');
const mongoose =  require('mongoose');
const cors = require('cors');
const TodoModel =require('./Module/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')
app.post('/add', (req, res)=>{
    const task = req.body.task
    TodoModel.create({
        task : task
    }).then(result=>res.json(result))
    .catch(err => console.log(err))
})

app.get('/get', (req, res)=>{
    TodoModel.find().then(result=> res.json(result))
    .catch(err => res.json(err))
})
app.put('/update/:id', (req, res)=>{
    const {id} = req.params
    console.log(id, req.body, req.body.done, !req.body.done)
    TodoModel.findByIdAndUpdate({_id:id},{ done : !req.body.done }).then(result=>
        { res.json(result)
            console.log(result)
        })
    .catch(err => res.json(err))
})
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params
    console.log(id)
    TodoModel.findByIdAndDelete({_id:id}).then(result=> res.json(result))
    .catch(err => res.json(err))
})


app.listen(3001, ()=>{
    console.log('server is running in 3001  da pundaaa')
})
