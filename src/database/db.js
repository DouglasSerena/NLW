const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.sqlite");

module.exports = db;

// db.serialize( () => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT 
//         );
//     `)

//     const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `;

//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyjhchbfawqiojeymdd9&auto=format&fit=crop&w=1350&q=80",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catariana",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ];

//     function afterInsertData(error) {
//         if (error) {
//             return console.log(error);
//         }

//         console.log("Cadastrado com sucesso");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);

//     db.all(`SELECT * FROM places`, function(error, rows) {
//         if(error) {
//             console.log(error);
//         }
        
//         console.log("Seus cadastros:")
//         console.log(rows);
//     });

//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(error) {
//         if (error) {
//             return console.log(error);
//         }

//         console.log("registro deletado com sucesso!");
//     });
// });
