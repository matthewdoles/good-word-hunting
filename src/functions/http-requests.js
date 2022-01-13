import { dev } from '$app/env';
const baseUrl = dev ? import.meta.env.VITE_DEV_API : import.meta.env.VITE_PROD_API;

export const getRandomMovie = async () => {
	const movieResponse = await fetch(baseUrl + '/api/random-movie');
	return await movieResponse.json();
};

export const getKeywords = async (movieId) => {
	const keywordsResponse = await fetch(baseUrl + `/api/${movieId}-keywords`);
	const allKeywords = await keywordsResponse.json();
	let keywords = [];
	allKeywords.forEach((keyword, i) => {
		if (i < 10) {
			keywords.push(keyword);
		}
	});
	return keywords;
};

export const getMovieCredits = async (movieId) => {
	const castResponse = await fetch(baseUrl + `/api/${movieId}-credits`);
	const allCast = await castResponse.json();
	let cast = [];
	allCast.forEach((castMember, i) => {
		if (i < 10) {
			cast = [...cast, castMember];
		}
	});
	return cast;
};

export const getSimilarMovies = async (movieId) => {
	const castResponse = await fetch(baseUrl + `/api/${movieId}-similar`);
	const allSimilar = await castResponse.json();
	let similar = [];
	allSimilar.forEach((similarMovie, i) => {
		if (i < 7) {
			similar = [...similar, similarMovie];
		}
	});
	return similar;
};
