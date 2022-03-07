const express = require("express")
const app = express();
require('dotenv').config();
const fetchData = require('./fetch');

app.get('/todos', async(req, res)=>{
        let arrayData  = await fetchData('https://jsonplaceholder.typicode.com/todos');
            let filteredData = arrayData.map(({id, title, completed}) => ({id, title, completed}));
    res.json(filteredData);
})
app.get('/users/:id', async(req, res)=>{
        let paramsId = req.params.id;
        let url =  `https://jsonplaceholder.typicode.com/users/${paramsId}`
        let objData = await fetchData(url);
        let {id, name, email, phone}= objData;

        let todosData = await fetchData("https://jsonplaceholder.typicode.com/todos");
        let resultObject = {};
        resultObject["id"] = id;
        resultObject["name"] = name;
        resultObject["email"] = email;
        resultObject["phone"] = phone;
        let filteredTodosData = todosData.filter((obj)=>(obj.userId == id));
        resultObject["todos"] = filteredTodosData;
        res.json(resultObject);
})

app.get('*', (_, res)=>{
    res.send("Path not found!");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})