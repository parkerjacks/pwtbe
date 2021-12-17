const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const db = require('./models')

app.use(cors())
app.use(express.json())

app.use(
    express.urlencoded({
        extended: true,
    })

);

app.post("/bat", (req, res) => {
    db.todos.findAll({
        where: {
            todo: req.body.bat
        }
    }
    ).then((results) => { 
        console.log(results)
        if(results.length == 0){ 
            db.todos.create({ 
                todo: req.body.bat
            })
            res.status(201).json({created:true,message:"bat in da cave"})
        } else { res.status(409).json({created:false,message:"twin bats cant share the same cave"})}
    })

})

app.get("/bats", (req,res) => { 
    db.todos.findAll({
    }).then((bats) => { 
        res.json({bats:bats})
    })
})

app.listen(port, () => {
    console.log(`listening on port:${port}`)
})