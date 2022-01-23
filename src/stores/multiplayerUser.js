import { writable } from 'svelte/store';
import socket from '../functions/socket';

const multiplayerUser = writable({ id: '', isAdmin: false, room: '' });

const customMultiplayerUser = {
  subscribe: multiplayerUser.subscribe,
  createRoom: (username, profileImage) => {
    socket.emit('createRoom', { username, profileImage }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
    multiplayerUser.update((items) => {
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
  leaveLobby: (id) => {
    socket.emit('leaveRoom', { id }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
    multiplayerUser.update(() => {
      return { id: '', isAdmin: false, room: '' };
    });
  },
  updateUserInfo: (userInfo) => {
    multiplayerUser.update((items) => {
      return { ...items, room: userInfo.room, id: userInfo.id };
    });
  }
};

export default customMultiplayerUser;
