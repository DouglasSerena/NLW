const express = require("express");
const server = express();

// database

const db = require("./database/db.js");

// configurar pasta public
server.use(express.static("public"));

server.use(express.urlencoded( { extended: true } ))

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


// form of point
server.get("/create-point", (req, res) => {
    return res.render("create-point.njk");
});


// insert point
server.post("/create-point", (req, res) => {
    const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ];

    function afterInsertData(error) {
        if (error) {
            console.log(error);
            return res.render("create-point.njk", {
                saved: true,
                modalName: "Erro ao cadastrar",
                svg: "error.svg",
                way: "/create-point"
            });
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.njk", {
            saved: true,
            modalName: "Cadastro concluído",
            svg: "check.svg",
            way: "/"
        });
    }

    db.run(query, values, afterInsertData);
});


// searcha points
server.get("/search-result", (req, res) => {

    const search = req.query.search;

    if ( search == "" ) {
        return res.render("search-result.njk");
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows) {
        if(error) {
            console.log(error);
        }

        const total = rows.length;
        
        console.log("Seus cadastros:")

        return res.render("search-result.njk", { places: rows, total });
    });
});

// ligar o servidor
server.listen(3000);
