const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 8000;

app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app.get('/users',(req,res)=>{
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html);
});


app.get('/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const html = `
        <table>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(user).map(([key, value]) => `
                    <tr>
                        <td>${key}</td>
                        <td>${value}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    res.send(html);
})

app.route("/api/users/:id")
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req,res) => {
        return res.json({status: "Pending"});
    })
    .delete((req,res)=>{
        return res.json({status: "Pending"});
    });


app.use(express.urlencoded({extended: false}));

app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body, id:users.length + 1});
    fs.writeFile("/MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.status(201).json({status : "success", id: users.length});
    });
})


app.listen(PORT,()=>console.log("Server Started!"));
