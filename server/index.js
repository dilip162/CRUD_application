const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

// ==== connecting to server =======

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: "crud_contact"
})

db.connect((err) => {
    if (err) throw err
    else { console.log('database is connected..') }
})

// =================================

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


//    ============ APIs ==========

app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM contact_db"
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    const { name, email, contact } = req.body
    const sqlInsert = 'INSERT INTO contact_db (name,email,contact) VALUES ("?","?","?")'
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})

app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params
    const sqlRemove = 'DELETE FROM contact_db WHERE id=?'
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})


app.get('/api/upadte/:id', (req, res) => {
    const id = req.params
    const sqlGet = "SELECT * FROM contact_db WHERE id=?"
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})


app.put('/api/upadte/:id', (req, res) => {
    const id = req.params
    const { name, email, contact } = req.body
    const sqlUpdate = "UPDATE contact_db SET name=?,email=?,contact=?, WHERE id=?"
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})


// ==============================

// app.get('/', (req, res) => {
// const sqlInsert = 'INSERT INTO contact_db (name,email,contact) VALUES ("johjerry","johndoe@test.com","1236589")'
// db.query(sqlInsert, (error, result) => {
//     console.log('error', error)
//     console.log('result', result)
//     res.send('Hello Express....')
// })
// })




// ======== Port Defining ==========
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})