from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send({'msg': f"{username} has joined the room {room}."}, room=room)

@socketio.on('leave')
def handle_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send({'msg': f"{username} has left the room {room}."}, room=room)

@socketio.on('message')
def handle_message(data):
    room = data['room']
    username = data['username']
    msg = data['msg']
    send({'msg': f"{username}: {msg}"}, room=room)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
