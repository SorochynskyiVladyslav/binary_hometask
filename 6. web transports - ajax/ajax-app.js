const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

var messages = [], users = [];

const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.render('index');
})

app.post('/user', (req, res, next) => {
    let unique_username = true;
    for (let i=0; i<users.length; i++) {
        if (users[i].username == req.body.username) unique_username = false;
    }
    if (unique_username) {
        users.push({name: req.body.name, username: req.body.username});
    }
    res.send('success');
})

app.delete('/user', (req, res, next) => {
    let userToDelete = {name: req.body.name, username: req.body.username};
    let deleteIndex = -1;

    for (let i=0; i < users.length; i++) {
        if (users[i].username == req.body.username) {
            deleteIndex = i;
            break;
        }
    }
    users.splice(deleteIndex, 1);
    res.send("deleted");
})

app.get('/messages', (req, res, next) => {
    res.json(messages);
})

app.post('/messages', (req, res, next) => {
    messages.push({body: req.body.body, from: req.body.from, mentions: req.body.mentions});
    res.send("success");
})

app.get('/users', (req, res, next) => {
    res.json(users);
})

const server = app.listen(1428);