const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

let db = new sqlite3.Database('./dataBase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

// Path to get player data
app.get('/players', (req, res) => {
    const sql = 'SELECT * FROM players';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Route to add a new player
app.post('/players', (req, res) => {
    const { name, time, difficulty } = req.body;
    const sql = 'INSERT INTO players (name, time, difficulty) VALUES (?, ?, ?)';
    const params = [name, time, difficulty];
    db.run(sql, params, function(err) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

