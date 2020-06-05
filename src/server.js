const express = require("express");
const server = express();

// configurar pasta public
server.use(express.static("public"));



// template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


// configurar rotas
// home
server.get("/", (req, res) => {
    return res.render("index.njk");
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.njk");
});

server.get("/search-result", (req, res) => {
    return res.render("search-result.njk");
});

// ligar o servidor
server.listen(3000);
