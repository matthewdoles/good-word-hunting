import { io } from 'socket.io-client';
import { browser } from '$app/env';
import multiplayerUser from '../stores/multiplayerUser';
import multiplayerLobby from '../stores/multiplayerLobby';

let socket = io('http://localhost:8080', { 'connect timeout': 5000 });

const initSocket = async () => {};

if (browser) {
  initSocket();
}

socket.on('gameStarted', (gameInfo) => {
  multiplayerLobby.updateGameStarted(gameInfo);
});

socket.on('lobbyDoneGuessing', () => {
  multiplayerLobby.updateLobbyDoneGuessing();
});

socket.on('updateLobbyUsers', (lobbyInfo) => {
  multiplayerLobby.updateLobbyUsers(lobbyInfo);
});

socket.on('userInfo', (userInfo) => {
  multiplayerUser.updateUserInfo(userInfo);
});

export default socket;
