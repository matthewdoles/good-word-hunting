export async function get({ params }) {
  let randomPage;
  let voteCount;
  if (params.mediaType === 'movie') {
    randomPage = Math.floor(Math.random() * 110) + 1;
    voteCount = 1500;
  } else {
    randomPage = Math.floor(Math.random() * 22) + 1;
    voteCount = 500;
  }

  const path =
    '/3/discover/' +
    params.mediaType +
    '?api_key=' +
    import.meta.env.VITE_API_KEY +
    '&language=' +
    import.meta.env.VITE_API_LANG +
    '&sort_by=original_title.asc' +
    '&include_adult=false' +
    'include_video=false' +
    '&page=' +
    randomPage +
    '&vote_count.gte=' +
    voteCount +
    '&with_original_language=en';

  const res = await fetch(import.meta.env.VITE_API_BASE_PATH + path);
  const data = await res.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);

  return {
    staus: 200,
    body: data.results[randomIndex]
  };
}
