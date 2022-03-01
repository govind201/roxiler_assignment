const express = require("express")
const app = express();
require('dotenv').config();
const fetchData = require('./fetch');

app.get('/todos', async(req, res)=>{
        let arrayData  = await fetchData('https://jsonplaceholder.typicode.com/todos');
            let filteredData = arrayData.map(({id, title, completed}) => ({id, title, completed}));
            console.log(filteredData);
    res.json(filteredData);
})
app.get('/users/:id', async(req, res)=>{
        let id = req.params.id;
        let url =  `https://jsonplaceholder.typicode.com/users/${id}`
        let arrayData  = await fetchData(url);
        console.log(arrayData);
        res.json(arrayData);
})

app.get('*', (_, res)=>{
    res.send("Path not found!");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})