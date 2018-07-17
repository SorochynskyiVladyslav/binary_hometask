var user = {username: 'user user', name: 'user'};

window.onload = () => {
    var socket = io.connect();

    let join_form = document.getElementById('join-form');
    let join_form_wrp = document.getElementById('join-form-wrp');
    let chat = document.getElementById('chat')
    let name_input = document.getElementById('name-input');
    let username_input = document.getElementById('username-input');
    let error_msg = document.getElementById('error-msg');
    let join_btn = document.getElementById('join-btn');
    let leave_btn = document.getElementById('leave-btn');
    let chat_history = document.getElementById('chat-history');
    let user_list = document.getElementById('users');
    let message_form = document.getElementById('message-form');
    let message_input = document.getElementById('message-input');
    let typing_message = document.getElementById('typing');

    username_input.addEventListener('input', () => {
        if (username_input.value.includes(' ')) {
            error_msg.innerText = 'Username can`t have white spaces';
            error_msg.style.display = 'block';
            join_btn.setAttribute('disabled', 'true');
        }
        else {
            error_msg.innerText = '';
            error_msg.style.display = 'none';
            join_btn.removeAttribute('disabled');
        }
    });
    join_form.addEventListener('submit', (event) => {
        event.preventDefault();
        user = {name: name_input.value, username: username_input.value, status: 'online'};
        socket.emit('join', user);
        join_form_wrp.style.display = 'none';
        chat.style.display = 'grid';
    });
    leave_btn.addEventListener('click', () => {
        join_form_wrp.style.display = 'flex';
        chat.style.display = 'none';
        socket.emit('user left', user);
        user = {username: 'user', name: 'user'};
    });
    window.onbeforeunload = () => {
        join_form_wrp.style.display = 'flex';
        chat.style.display = 'none';
        socket.emit('user left', user);
        user = {username: 'user user', name: 'user'};
    }
    message_form.addEventListener('submit', (event)=>{
        event.preventDefault();
        let message_text = message_input.value;
        let message = {};
        message.body = message_text;
        message.mentions = findMentions(message_text);
        message.from = {};
        message.from.name = user.name;
        message.from.username = user.username;
        socket.emit('message', message);
        message_input.value = '';
    })
    message_input.addEventListener('input', ()=>{
        socket.emit('input', user.username);
    })

    socket.on('chat history', messages => {
        while(chat_history.firstChild){
            chat_history.removeChild(chat_history.firstChild);
        }
        let startpoint = 0;
        if (messages.length > 100) startpoint = messages.length - 100;
        for (let i=startpoint; i < messages.length; i++) {
            chat_history.appendChild(generateMessage(messages[i]));
        }
        chat_history.scrollTop = chat_history.scrollHeight;
    });
    socket.on('update users', users => {
        while (user_list.firstChild) {
            user_list.removeChild(user_list.firstChild);
        }
        for (let i=0; i < users.length; i++) {
            user_list.appendChild(generateUser(users[i]));
        }
    })
    socket.on('message', message => {
        chat_history.appendChild(generateMessage(message));
    })
    socket.on('input', username => {
        if (username != user.username){
            typing_message.innerText = `@${username} is typing...`;
            typing_message.style.display = 'block';
        }
    })
    socket.on('input end', () => {
        typing_message.innerText = ``;
        typing_message.style.display = 'none';
    })
}

function generateMessage(message) {
    let message_node = document.createElement('div');
    message_node.classList.add('ui', 'message');
    if (message.service) {
        message_node.classList.add('center');
        message_node.innerText = `${message.body}`;
    }
    else {
        if (message.mentions.includes(user.username))
            message_node.classList.add('yellow');
        if (message.from.username == user.username)
            message_node.classList.add('right');
        message_node.innerText = `${message.from.name} (@${message.from.username}): ${message.body}`;
    }
    return message_node;
}

function generateUser(userInfo) {
    let user_node = document.createElement('div');
    user_node.classList.add('user');
    let p_node = document.createElement('p');
    p_node.innerText = userInfo.name;
    user_node.appendChild(p_node);
    let p_username = document.createElement('p');
    p_username.classList.add('username');
    p_username.innerText = userInfo.username;
    let status = document.createElement('label');
    if (userInfo.status == 'online' || userInfo.status == 'just appeared')
        status.classList.add('ui', 'green', 'label');
    else status.classList.add('ui', 'red', 'label');
    status.innerText = userInfo.status;
    user_node.appendChild(p_username);
    user_node.appendChild(status);

    if (userInfo.username == user.username) {
        user_node.style.backgroundColor = 'rgba(196, 209, 81, 0.3)'
    }
    return user_node;
}

function findMentions(message_text) {
    let mentionedUsers = [];
    let mentionIndex = 0;
    while(message_text.indexOf('@', mentionIndex) >= 0) {
        let mention = '';
        mentionIndex = message_text.indexOf('@', mentionIndex);
        mentionIndex++;
        for (let i = mentionIndex; i < message_text.length; i++) {
            let char = message_text.charAt(i);
            mentionIndex++;
            if (char == ' ' ||char == ',' || char == '\n' || char == '.') break;
            else {
                mention += char;
            }
        }
        mentionedUsers.push(mention);
    }
    return mentionedUsers;
}
