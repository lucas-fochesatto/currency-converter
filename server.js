const express = require('express')
const server = express()

server
.use(express.static("public"))
.get("/", (req, res) => {
    res.render("index.html")
})
.listen(55767) //Start the server on http://localhost:3000/