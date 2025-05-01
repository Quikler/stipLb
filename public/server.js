const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const names = [
    "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ivan", "Julia"
]

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

app.get('/', (req, res) => res.status(200).json("Привіт, Express!"))

app.get('/api/user', (req, res) => {
    const name = names[Math.floor(getRandomArbitrary(0, names.length))];
    const age = Math.floor(getRandomArbitrary(0, 80));
    return res.status(200).json({ name, age });
});

app.post('/api/uppercase', (req, res) => {
    const text = req.body?.text;
    if (typeof text === 'string') {
        return res.status(200).json(text.toUpperCase());
    }
    return res.status(400).json({ error: 'Wrong text type.' });
});

app.listen(3000, () => { console.log('Сервер запущенний на порту 3000'); });
