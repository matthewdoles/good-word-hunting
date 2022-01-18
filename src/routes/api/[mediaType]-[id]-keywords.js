export async function get({ params }) {
	const path =
		'/3/' +
		params.mediaType +
		'/' +
		params.id +
		'/keywords?api_key=' +
		import.meta.env.VITE_API_KEY;
	const res = await fetch(import.meta.env.VITE_API_BASE_PATH + path);
	const data = await res.json();
	const keywords = params.mediaType === 'movie' ? data.keywords : data.results;

	return {
		staus: 200,
		body: keywords
	};
}
