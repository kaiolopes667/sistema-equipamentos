const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});

const routes = express.Router();

routes.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            return res.status(200).json(user);
        } else {
            return res.status(401).json({ message: 'Credenciais Inválidas' });
        }
    });
});

module.exports = routes;
