import { dev } from '$app/env';
import { get } from 'svelte/store';
import filters from '../stores/filters';

const baseUrl = dev ? import.meta.env.VITE_DEV_API : import.meta.env.VITE_PROD_API;

export const getRandomMedia = async () => {
	const filter = get(filters);
	const mediaResponse = await fetch(baseUrl + `/api/random-${filter.mediaType}`);
	let media = await mediaResponse.json();
	if (filter.mediaType === 'tv') {
		media.title = media.name;
	}
	return media;
};

export const getKeywords = async (mediaId) => {
	const filter = get(filters);
	const keywordsResponse = await fetch(baseUrl + `/api/${filter.mediaType}-${mediaId}-keywords`);
	const allKeywords = await keywordsResponse.json();
	let keywords = [];
	allKeywords.forEach((keyword, i) => {
		if (i < 10) {
			keywords.push(keyword);
		}
	});
	return keywords;
};

export const getMediaCredits = async (mediaId) => {
	const filter = get(filters);
	const castResponse = await fetch(baseUrl + `/api/${filter.mediaType}-${mediaId}-credits`);
	const allCast = await castResponse.json();
	let cast = [];
	allCast.forEach((castMember, i) => {
		if (i < 10) {
			cast = [...cast, castMember];
		}
	});
	return cast;
};

export const getSimilarMedia = async (mediaId) => {
	const filter = get(filters);
	const castResponse = await fetch(baseUrl + `/api/${filter.mediaType}-${mediaId}-similar`);
	const allSimilar = await castResponse.json();
	let similar = [];
	allSimilar.forEach((similarMedia, i) => {
		if (i < 7) {
			if (filter.mediaType === 'tv') {
				similarMedia.title = similarMedia.name;
			}
			similar = [...similar, similarMedia];
		}
	});
	return similar;
};

export const getGenres = async () => {
	const movieGenresResponse = await fetch(baseUrl + '/api/movie-genres');
	const movieGenres = await movieGenresResponse.json();
	const tvGenresResponse = await fetch(baseUrl + '/api/tv-genres');
	const tvGenres = await tvGenresResponse.json();
	return { tv: tvGenres, movies: movieGenres };
};
