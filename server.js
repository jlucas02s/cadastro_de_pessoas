const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Middleware cors para permitir requisições de origens diferentes
app.use(cors());

// Rota para cadastrar uma nova pessoa
app.post('/api/pessoas', (req, res) => {
    const pessoa = req.body;
    db.run(`INSERT INTO pessoas (nome, data_nascimento, email, cpf, nome_mae, nome_pai, telefone_mae, telefone_pai, comunidade) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [pessoa.nome, pessoa.data_nascimento, pessoa.email, pessoa.cpf, pessoa.nome_mae, pessoa.nome_pai, pessoa.telefone_mae, pessoa.telefone_pai, pessoa.comunidade], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({
                    message: 'Pessoa cadastrada com sucesso',
                    pessoa_id: this.lastID
                });
            });
});

// Rota para pesquisar pessoas
app.get('/api/pessoas', (req, res) => {
    const { q } = req.query;
    let query = "SELECT * FROM pessoas";
    let params = [];

    if (q) {
        query += " WHERE nome LIKE ? OR email LIKE ?";
        params = [`%${q}%`, `%${q}%`];
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
