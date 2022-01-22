import { io } from 'socket.io-client';
import { browser } from '$app/env';
import { writable } from 'svelte/store';

let socket = io('http://localhost:8080', { 'connect timeout': 5000 });

const initSocket = async () => {
  socket.on('connect', () => {});
};

if (browser) {
  initSocket();
}

const multiplayer = writable({ isAdmin: false, room: '', users: [] });

const customMultiplayer = {
  subscribe: multiplayer.subscribe,
  createRoom: (username, profileImage) => {
    socket.emit('createRoom', { username, profileImage }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
    multiplayer.update((items) => {
      return { ...items, isAdmin: true };
    });
  },
  joinRoom: (username, profileImage, roomNumber) => {
    socket.emit('joinRoom', { username, profileImage, roomNumber }, (error) => {
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
