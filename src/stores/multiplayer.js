import { io } from 'socket.io-client';
import { browser } from '$app/env';
import { writable } from 'svelte/store';

let socket = io('http://localhost:8080', { 'connect timeout': 5000 });

const initSocket = async () => {
  socket.on('connect', () => {
    console.log('socket created with ID:', socket.id);
  });
};

if (browser) {
  initSocket();
}

const multiplayer = writable({ room: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayer.subscribe,
  createRoom: (username) => {
    socket.emit('createRoom', username, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  joinRoom: (username, roomNumber) => {
    socket.emit('joinRoom', { username, roomNumber }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  updateRoomInformation: (roomInfo) => {
    multiplayer.update((items) => {
      return { ...items, room: roomInfo.room, users: roomInfo.users };
    });
  }
};

socket.on('roomData', (roomInfo) => {
  customMultiplayer.updateRoomInformation(roomInfo);
});

export default customMultiplayer;
