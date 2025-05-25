import bodyParser from 'body-parser';
import Express from 'express';

const app = Express();
app.use(bodyParser.json())

// app.all("/",(req,res)=>{
//     console.log("hello");
//     res.send("working!!")
// })

let todos=[{
    id: 1,
    title: 'task1',
    completed: 'false'
},{
    id: 2,
    title: 'task2',
    completed: 'true'
}]

app.get("/todos",(req,res)=>{
    res.json(todos)
})

app.post("/todos",(req,res)=>{
    const newTodo=req.body;
    todos.push(newTodo);
    res.json({message:"todos added"})
})

app.put("/todos/:id",(req,res)=>{
    const newTodoData = req.body;
    const todoParamId = Number(req.params.id)
    const todoIndex = todos.findIndex(td=>td.id===todoParamId)
    if(todoIndex!==-1){
        todos[todoIndex] = {
            id: todoParamId,
            ...newTodoData
        }
    }
    res.json({message:"todo updated"})
})

app.delete("/todos/:id", (req,res)=>{
    const todoParamId = Number(req.params.id)
    todos=todos.filter(td=>td.id!==todoParamId)
    res.json({message:"todo deleted"})
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Successfully listening at port ${PORT}`)
})