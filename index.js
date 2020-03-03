const mysql  = require('mysql')
const express = require('express')
var app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())
var mysqlConnect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password: '1234Abc',
    user: 'root',
    schema: 'db_test',
    database: 'db_test'

});
mysqlConnect.connect((err)=>{
     if(!err) {
         console.log("connection succeded!")
     } else {
         console.log("connection failed "+ err)
     }
})

app.listen(3000, () => console.log("Express running at port 3000"))

//api get all users
app.get('/users', (req,res)=> {
    mysqlConnect.query("SELECT * FROM users", (err, rows, fieds) => {
        if(!err) res.send(rows)
        else console.log("nodata")
    })
})

//api get user by id 
app.get('/user/:id', (req,res)=> {
    console.log('req', req.params)
    let id  = req.params.id
    mysqlConnect.query("SELECT * FROM users where id = ?",[id], (err, rows, fieds) => {
        if(!err) res.send(rows)
        else console.log("nodata")
    })
})

//api delete an user
app.delete('/user/:id', (Request, Response)=> {
    let id  = Request.params.id
    mysqlConnect.query('delete from users where id = ?', [id], (err, rows) => {
        if(!err)Response.send("Deleted ")
        else Response.send('Delete failed'+ err)

    } )
})
