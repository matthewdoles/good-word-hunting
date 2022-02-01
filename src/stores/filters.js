import { writable } from 'svelte/store';
import { get } from 'svelte/store';
import socket from '../functions/socket';
import multiplayerUser from './multiplayerUser';

const tvMedia = {
  mediaType: 'tv',
  prompt: {
    singular: 'show',
    plural: 'shows'
  },
  genre: {
    id: 'none',
    name: ''
  },
  voteCount: 500,
  rating: 0
};

const movieMedia = {
  mediaType: 'movie',
  prompt: {
    singular: 'movie',
    plural: 'movies'
  },
  genre: {
    id: 'none',
    name: ''
  },
  voteCount: 1500,
  rating: 0
};

const filters = writable({ ...movieMedia, difficulty: 'Medium' });

const customFilters = {
  subscribe: filters.subscribe,
  changeMediaType: (mediaType) => {
    filters.update((items) => {
      if (mediaType === 'movie') return { ...movieMedia, difficulty: items.difficulty };
      return { ...tvMedia, difficulty: items.difficulty };
    });
  },
  changeDifficulty: (difficulty) => {
    filters.update((items) => {
      return { ...items, difficulty };
    });

    const user = get(multiplayerUser);
    if (user.lobbyId.length > 0 && user.isAdmin) {
      socket.emit('updateGameDifficulty', { lobbyId: user.lobbyId, difficulty }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  },
  changeGenre: (genre) => {
    filters.update((items) => {
      return { ...items, genre };
    });
  },
  changeRating: (rating) => {
    filters.update((items) => {
      return { ...items, rating };
    });
  },
  changeVoteCount: (voteCount) => {
    filters.update((items) => {
      return { ...items, voteCount };
    });
  }
};

export default customFilters;
