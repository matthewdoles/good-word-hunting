import { io } from 'socket.io-client';
import { browser } from '$app/env';
import multiplayerUser from '../stores/multiplayerUser';
import multiplayerLobby from '../stores/multiplayerLobby';

let socket = io(import.meta.env.VITE_SOCKET_URL, { 'connect timeout': 5000 });

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

socket.on('roundStarted', (gameInfo) => {
  multiplayerLobby.updateNewRoundStartd(gameInfo);
});

socket.on('updateLobbyUsers', (lobbyInfo) => {
  multiplayerLobby.updateLobbyUsers(lobbyInfo);
});

socket.on('setAsLobbyAdmin', () => {
  multiplayerUser.setAsLobbyAdmin();
});

socket.on('userInfo', (userInfo) => {
  multiplayerUser.updateUserInfo(userInfo);
});

export default socket;
