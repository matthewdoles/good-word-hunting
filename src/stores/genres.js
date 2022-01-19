import { getGenres } from '../functions/http-requests';
import { writable } from 'svelte/store';

const fetchGenres = async () => {
  const fetchedGenres = await getGenres();
  genres.set(fetchedGenres);
};
fetchGenres();

export const genres = writable({ tv: [], movies: [] });
