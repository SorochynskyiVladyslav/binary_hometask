var user = {username: 'user', name: 'user'};
var local_users = [];
var last_message = {body: '', from: ''};

window.onload = () => {
    let join_form = document.getElementById('join-form');
    let join_form_wrp = document.getElementById('join-form-wrp');
    let chat = document.getElementById('chat')
    let name_input = document.getElementById('name-input');
    let username_input = document.getElementById('username-input');
    let error_msg = document.getElementById('error-msg');
    let join_btn = document.getElementById('join-btn');
    let leave_btn = document.getElementById('leave-btn');

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
        joinChat(name_input.value, username_input.value);
    });
    leave_btn.addEventListener('click', () => {
        ajaxRequest({
            url: '/user',
            method: 'DELETE',
            data: user,
            callback(response){
                console.log(response);
                join_form_wrp.style.display = 'flex';
                chat.style.display = 'none';
                user = {username: 'user', name: 'user'};
            }
        });
    });


}

window.onbeforeunload = ()=>{
    //logout;
}

function joinChat(name, username) {
    let new_user = {name: name, username: username};
    user.username = username;
    user.name = name;
    console.log(user);
    ajaxRequest({
        url: '/user',
        method: 'POST',
        data: new_user,
        callback: (response) => {
            if (response == "success") {
                showChat();
            }
            else {
                let error_msg = document.getElementById('error-msg');
                error_msg.innerText = response;
                error_msg.style.display = 'block';
            }
        }
    });
    let message_form = document.getElementById('message-form');
    let message_input = document.getElementById('message-input');

    message_form.addEventListener('submit', (event) => {
        event.preventDefault();
        let message_text = message_input.value;
        let message = {};
        message.body = message_text;
        message.mentions = findMentions(message_text);
        message.from = {};
        message.from.name = user.name;
        message.from.username = user.username;
        ajaxRequest({
            url: '/messages',
            method: 'POST',
            data: message,
            callback: (response) => {
                console.log(response);
            }
        })
        message_input.value = '';
    })
}

function showChat(){
    let join_form = document.getElementById('join-form-wrp');
    let chat = document.getElementById('chat');
    chat.style.display = 'grid';

    loadHistory();
    loadUsers();

    join_form.style.display = 'none';
    setInterval(()=>{
        update_users();
        update_messages();
    }, 2000);

}

function generateMessage(message) {
    let message_node = document.createElement('div');
    message_node.classList.add('ui', 'message');
    if (message.mentions.includes(user.username))
        message_node.classList.add('yellow');
    if (message.from.username == user.username)
        message_node.classList.add('right');
    /*
    let user_node = document.createElement('div');
    user_node.classList.add('user');
    user_node.innerText = `${message.from.name} (@${message.from.username})`;
    message_node.appendChild(user_node);
    let p_node = document.createElement('p');
    p_node.innerText = message.body;
    message_node.appendChild(p_node);
    */
    message_node.innerText = `${message.from.name} (@${message.from.username}): ${message.body}`;


    return message_node;
}

function generateUser(user) {
    let user_node = document.createElement('div');
    user_node.classList.add('user');
    let p_node = document.createElement('p');
    p_node.innerText = user.name;
    user_node.appendChild(p_node);
    let p_username = document.createElement('p');
    p_username.classList.add('username');
    p_username.innerText = user.username;
    user_node.appendChild(p_username);
    return user_node;
}

function loadHistory() {
    let chat_history = document.getElementById('chat-history');
    while (chat_history.firstChild) {
        chat_history.removeChild(chat_history.firstChild);
    }
    ajaxRequest({
        url: '/messages',
        method: 'GET',
        callback: (response) => {
            let messages = JSON.parse(response);

            let chat_history = document.getElementById('chat-history');
            let startpoint = 0;
            if (messages.length > 100) startpoint = messages.length - 100;
            for (let i=startpoint; i < messages.length; i++) {
                chat_history.appendChild(generateMessage(messages[i]));
            }
            last_message.body = messages[messages.length - 1].body;
            last_message.from = messages[messages.length - 1].from.username;
        }
    })
}



function loadUsers() {
    ajaxRequest({
        url: '/users',
        method: 'GET',
        callback: (response) => {
            let users = JSON.parse(response);
            let user_list = document.getElementById('users');
            console.log(users);
            for (let i=0; i < users.length; i++) {
                user_list.appendChild(generateUser(users[i]));
                local_users.push(user[i]);
            }
        }
    })
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

function update_users() {
    ajaxRequest({
        url: '/users',
        method: 'GET',
        callback: (response)=>{
            console.log('users: '+response);
            let user_list = document.getElementById('users');
            let users = JSON.parse(response);
            if (local_users == users) return;
            local_users = [];
            while (user_list.firstChild) {
                user_list.removeChild(user_list.firstChild);
            }
            for (let i=0; i < users.length; i++) {
                user_list.appendChild(generateUser(users[i]));
                local_users.push(user[i]);
            }
        }
    })
}

function update_messages(){
    ajaxRequest({
        url: '/messages',
        method: 'GET',
        callback: (response)=>{

            let messages = JSON.parse(response);
            console.log(`last: ${last_message.body} messages: ${JSON.stringify(messages)}`);
            let chat_history = document.getElementById('chat-history');
            let start_index = 0;
            if (messages[messages.length - 1].from.username == last_message.from && messages[messages.length - 1].body.username == last_message.body) return;
            for (let i=0; i < messages.length; i++) {
                if (messages[i].body == last_message.body && messages[i].from.username == last_message.from) {
                    start_index = i + 1;
                    break;
                }
            }
            for (let i=start_index; i < messages.length; i++){
                chat_history.appendChild(generateMessage(messages[i]));
            }
            last_message.body = messages[messages.length - 1].body;
            last_message.from = messages[messages.length - 1].from.username;
        }
    })
}