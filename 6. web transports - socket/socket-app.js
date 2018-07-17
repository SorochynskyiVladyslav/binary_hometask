const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

var messages = [], users = [];

const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
})

io.on('connection', socket => {
    socket.on('join', user => {
        let new_user = true;
        let user_index = users.length;
        for (let i=0; i<users.length; i++) {
            if (users[i].username == user.username) {
                new_user = false;
                user_index = i;
                break;
            }
        }
        if (new_user) {
            users.push(user);
        }
        users[user_index].status = 'just appeared';
        setTimeout((user_index)=>{
            if (users[user_index].status == 'just appeared') {
                users[user_index].status = 'online';
                io.emit('update users', users);
            }
            }, 60000, user_index);
        socket.emit('chat history', messages);
        io.emit('update users', users);
    });
    socket.on('user left', user => {
        let user_index = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == user.username) {
                users[i].status = 'just left';
                io.emit('update users', users);
                user_index = i;
                break;
            }
        }
        setTimeout((user_index) => {
            if (users[user_index].status == 'just left') {
                users[user_index].status = 'offline';
                io.emit('update users', users);
            }
        }, 60000, user_index);
        if (user.username != 'user user'){
            let message = {
                body: `@${user.username} has left chat`,
                service: true
            }
            messages.push(message);
            io.emit('message', message);
        }
    });
    socket.on('message', message => {
        messages.push(message);
        io.emit('message', message);
    });
    socket.on('input', username => {
        io.emit('input', username);
        setTimeout(() => {
            io.emit('input end');
        }, 4000);
    });
})










/*
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
*/
http.listen(1428, ()=>{
    console.log('listnening to 1428');
    });