const sqlite3 = require('sqlite3').verbose();

// Conectar-se ao banco de dados (ou criar se não existir)
const db = new sqlite3.Database('banco.db', (err) => {
    if (err) {
        console.error('Erro ao conectar-se ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criar tabela de pessoas
db.run(`CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_nascimento TEXT NOT NULL,
    email TEXT NOT NULL,
    cpf TEXT NOT NULL,
    nome_mae TEXT NOT NULL,
    nome_pai TEXT,
    telefone_mae TEXT,
    telefone_pai TEXT,
    comunidade TEXT NOT NULL
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela de pessoas:', err.message);
    } else {
        console.log('Tabela de pessoas criada com sucesso.');
    }
});

module.exports = db;





