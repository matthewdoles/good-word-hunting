import { writable } from 'svelte/store';

const tvMedia = {
  mediaType: 'tv',
  prompt: {
    singular: 'show',
    plural: 'shows'
  },
  genre: {
    id: '',
    name: ''
  }
};

const movieMedia = {
  mediaType: 'movie',
  prompt: {
    singular: 'movie',
    plural: 'movies'
  },
  genre: {
    id: '',
    name: ''
  }
};

const filters = writable(movieMedia);

const customFilters = {
  subscribe: filters.subscribe,
  changeMediaType: (mediaType) => {
    filters.update(() => {
      if (mediaType === 'movie') return movieMedia;
      return tvMedia;
    });
  },
  changeGenre: (genre) => {
    filters.update((items) => {
      console.log(items);
      return { ...items, genre };
    });
  }
};

export default customFilters;
