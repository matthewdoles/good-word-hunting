import { writable } from 'svelte/store';

const tvMedia = {
	mediaType: 'tv',
	prompt: {
		singular: 'show',
		plural: 'shows'
	}
};

const movieMedia = {
	mediaType: 'movie',
	prompt: {
		singular: 'movie',
		plural: 'movies'
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
	}
};

export default customFilters;
