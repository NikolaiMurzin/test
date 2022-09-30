const _dao = require("./dao")
const _repo = require("./repository")
const express = require("express")
const cors = require("cors")

const app = express()

const dao = new _dao('./db.sqlite3')
const repo = new _repo(dao)

repo.createTable()
    .then(() => {
        repo.initData()
    })

app.use(cors())
app.get("/data", async(req, res) => {
    res.send(await repo.getAll())
})

app.listen(3001)