const express = require("express")
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');


app.get('/todos', async(req, res)=>{
        let arrayData  = await fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()).catch(err => console.error(err));
            let filteredData = arrayData.map(({id, title, completed}) => ({id, title, completed}));
            console.log(filteredData);
    res.json(filteredData);
})
app.get('/users/:id', async(req, res)=>{
        let id = req.params.id;
        let arrayData  = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json()).catch(err => console.error(err));
        console.log(arrayData);
        res.json(arrayData);
})

app.get('*', (_, res)=>{
    res.send("Path not found!");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})