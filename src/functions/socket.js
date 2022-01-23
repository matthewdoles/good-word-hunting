import { io } from 'socket.io-client';
import { browser } from '$app/env';
import multiplayerUser from '../stores/multiplayerUser';
import multiplayerLobby from '../stores/multiplayerLobby';

let socket = io('http://localhost:8080', { 'connect timeout': 5000 });

const initSocket = async () => {
  socket.on('connect', () => {});
};

if (browser) {
  initSocket();
}

socket.on('roomData', (roomInfo) => {
  multiplayerLobby.updateLobbyUsers(roomInfo);
});

socket.on('userInfo', (userInfo) => {
  multiplayerUser.updateUserInfo(userInfo);
});

export default socket;
