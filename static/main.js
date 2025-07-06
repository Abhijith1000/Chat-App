var socket = io();
var currentRoom = '';

function joinRoom() {
    var username = document.getElementById('username').value;
    var room = document.getElementById('room').value;

    if (room === '' || username === '') {
        alert("Username and room are required!");
        return;
    }

    socket.emit('join', {'username': username, 'room': room});
    currentRoom = room;
}

function leaveRoom() {
    var username = document.getElementById('username').value;
    var room = document.getElementById('room').value;

    socket.emit('leave', {'username': username, 'room': room});
    currentRoom = '';
}

function sendMessage() {
    var username = document.getElementById('username').value;
    var msg = document.getElementById('message').value;

    if (currentRoom === '') {
        alert("Join a room first!");
        return;
    }

    socket.emit('message', {'username': username, 'msg': msg, 'room': currentRoom});
    document.getElementById('message').value = '';
}

socket.on('message', function(data) {
    var chat = document.getElementById('chat');
    var p = document.createElement('p');
    p.innerHTML = data.msg;
    chat.appendChild(p);
});
