const config = require('./connection')
const express = require('express')
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.json())

// getting * data
app.get('/students', (req, res) => {
    config.query('SELECT * FROM students', (err, rows) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.status(400).send(rows)
        }
    })
})

// getting specified data
app.get('/students/:id', (req, res) => {
    config.query('SELECT * FROM students WHERE id =?',[req.params.id], (err, rows) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.status(400).send(rows)
        }
    })
})

// deleting particular data 
app.delete('/students/:id', (req, res) => {
    config.query('DELETE FROM students WHERE id =?',[req.params.id], (err, rows) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.status(400).send(rows)
        }
    })
})

// adding data
app.post('/students', (req, res) => {
    let std = req.body;
    let stdData = [std.name, std.class, std.section, std.phone]

    config.query("INSERT INTO students (name, class, section, contact) VALUES (?)",[stdData], (err, rows) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            res.status(400).send(rows)
        }
    })
})

// updating data with each row
app.patch('/students/:id', (req, res) => {
    let std = req.body;
    let sql = `UPDATE students SET name = ?, class = ?, section = ?, contact = ? WHERE id = ?`
    config.query(sql, [std.name, std.class, std.section, std.contact, req.params.id], (err, rows) => {
        if (err) {
            // console.error("Error updating student:", err);
            res.status(500).send("Error updating student");
        } else {
            res.status(200).send(rows);
        }
    });
});
app.put('/students/:id', (req, res) => {
    let std = req.body;
    let sql = `UPDATE students SET name = ?, class = ?, section = ?, contact = ? WHERE id = ?`
    config.query(sql, [std.name, std.class, std.section, std.contact, req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if(rows.affectedRows == 0)
            {
                let stdData = [std.name, std.class, std.section, std.contact]

                config.query("INSERT INTO students (name, class, section, contact) VALUES (?)",[stdData], (err, rows) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(rows);
                        res.status(400).send(rows)
                    }
                })
            }else{
                res.status(200).send(rows);
            }
        }
    });
});




app.listen(4000, () => {
    console.log('server is listening to port 4000');
})