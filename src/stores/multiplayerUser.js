import { writable } from 'svelte/store';
import socket from '../functions/socket';

const multiplayerUser = writable({ id: '', isAdmin: false, lobbyId: '' });

const customMultiplayerUser = {
  subscribe: multiplayerUser.subscribe,
  createLobby: (username, profileImage) => {
    socket.emit('createLobby', { username, profileImage }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
    multiplayerUser.update((items) => {
      return { ...items, isAdmin: true };
    });
  },
  joinLobby: (username, profileImage, lobbyId) => {
    socket.emit('joinLobby', { username, profileImage, lobbyId }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  },
  leaveLobby: (lobbyId, userId) => {
    socket.emit('leaveLobby', { lobbyId, userId }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
    multiplayerUser.update(() => {
      return { id: '', isAdmin: false, lobbyId: '' };
    });
  },
  updateUserInfo: (userInfo) => {
    multiplayerUser.update((items) => {
      return { ...items, lobbyId: userInfo.lobbyId, id: userInfo.id };
    });
  }
};

export default customMultiplayerUser;
