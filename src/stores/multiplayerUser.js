import { writable } from 'svelte/store';
import socket from '../functions/socket';

const initUser = { id: '', isAdmin: false, lobbyId: '', error: '' };

const multiplayerUser = writable(initUser);

const customMultiplayerUser = {
  subscribe: multiplayerUser.subscribe,
  createLobby: (username, profileImage) => {
    socket.emit('createLobby', { username, profileImage }, (error) => {
      if (error) {
        multiplayerUser.update((items) => {
          return { ...items, error: 'Sorry, trouble connecting to lobby. Please try again.' };
        });
      }
    });
    multiplayerUser.update((items) => {
      return { ...items, isAdmin: true };
    });
  },
  joinLobby: (username, profileImage, lobbyId) => {
    socket.emit('joinLobby', { username, profileImage, lobbyId }, (error) => {
      if (error) {
        multiplayerUser.update((items) => {
          return { ...items, error: 'Sorry, trouble connecting to lobby. Please try again.' };
        });
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
      return initUser;
    });
  },
  addError: (error) => {
    multiplayerUser.update((items) => {
      return { ...items, error };
    });
  },
  clearError: () => {
    multiplayerUser.update((items) => {
      return { ...items, error: '' };
    });
  },
  updateUserInfo: (userInfo) => {
    multiplayerUser.update((items) => {
      return { ...items, lobbyId: userInfo.lobbyId, id: userInfo.id };
    });
  }
};

export default customMultiplayerUser;
