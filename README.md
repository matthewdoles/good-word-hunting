# Good Word Hunting

### Description

This website is a trivia game where the user is given up to 10 keywords to describe a movie/tv show and up to 10 cast members in said media which they then use to guess the title. The game itself can be played solo or with friends with the ability to apply various filters and difficulties. This project was my first solo foray into Svelte.

#### URL

- [https://good-word-hunting.vercel.app/](https://good-word-hunting.vercel.app/)

#### Deployment

The site is hosted on [Vercel](https://vercel.com/), which comes in handy for hosting and deploying more niche frameworks like Next, Nuxt, and Svelte. Every commit or merge to main is setup to automatically re-deploy the main branch into production.

#### API

Data is ultimately pulled from [The Movie Database](https://developers.themoviedb.org/3), but SvelteKit has a great feature where any JavaScript file that default exports a function correlated to an HTTP method becomes an API endpoint. This project pings it's own API to retrieve media data which is then retrieved from The Movie Database. All the endpoints can be found under the [/api](https://github.com/matthewdoles/good-word-hunting/tree/main/src/routes/api) route.

Another wonderful featue is the ability to insert dynamic parameters into the route itself. For instance, to get the credits for Star Wars the API route is /api/[mediaType]-[id]-credits. The media type here would be movie and the id of this movie on The Movie Database is 11. In production, the complete link looks like this: [https://good-word-hunting.vercel.app/api/movie-11-credits](https://good-word-hunting.vercel.app/api/movie-11-credits).

### Features

#### Game

The original design and flow of the game goes like this:

1. The player is given up to 10 words related to a randomly fetched piece of media (tv or movie).
2. Given the keywords, the player is then asked from lowest billed to highest how many cast members they would need to guess the movie (up to 10 members, rare occurences cast may be less).
3. After selecting a number, the given cast members are listed and the user uses the collective information to then guess the title of the movie or tv show.
4. After giving a guess, the guess and answer are and the results are shown. The post game results will show the correct movie, keywords, and all cast (w/ pictures).

As I started building out more and more features, I expanded on the game by adding the ability to ask for a hint after the third step. Using The Movie Database to fetch similar media, 8 total options will be listed: 7 similar and 1 correct.

In conjunction with the below filters feature, a game difficulty can be selected where hints may or may not be enabled or even try the impossible and just straight up guess a movie based on the keywords alone.

#### Filters

The filters feature provides the ability to apply various filters such as media type (movie or tv), the genre of the media, and metrics related to the popularity of the media such as the rating and number of reviews it has. Whenever the user adjusts any of these filters, the pool size is calcualted and updated based ontheir selected filters. The next time the player starts a new game, a random piece of media will be fetched based on the provided selections. Default filters are also provided as to avoid fetching an obscure piece of media.

Bundled with filtering is the ability to select a game difficulty. There are 4 selectable difficulties: Easy, Medium, Hard, and Impossible. Descriptions of each can be found on the filters each, and likewise the next time a user starts a game the selected difficulty setting will be applied.

Filters Page: [https://good-word-hunting.vercel.app/filters](https://good-word-hunting.vercel.app/filters)

#### Multiplayer

Multiplayer is enabled and managed using [Socket.io](https://socket.io/). This documentation will focus more so on the frontend portions of multiplayer. More thorogh details of the backend can be found in it's dedicated repository: [https://github.com/matthewdoles/good-word-hunting-bakcend](https://github.com/matthewdoles/good-word-hunting-bakcend).

This was my first venture into trying something like this and using WebSocket based technology. While it was extremely frustrating at first, it has been really rewarding. The frustration really stemming from the lack of examples I could find online of Svelte projects (especially SvelteKit) using socket technology. Through trail and discovery, I found that the simplest solution was to setup a seperate dedicated backend which my Svelte frontend could connect w/ via the Client API.

When visiting the Multiplayer page, the user will find two options: Create or Join. The Create option navigating them to a form to enter a username and optionally a profil pic url. Upon submit, a new lobby is created with a unique 4-character code. The creator of the lobby will be designated as the lobby admin. With that lobby code, other users then use the Join option which takes them to the same form but an additional input to enter the lobby code.

With all users present, the admin alone will see a button to start the game next to the lobby code. When the game is started, the flow of the game is exactly the same as descripted in the Game section. The only differences being upon submitting a guess, users will wait until all users in the lobby have finished guessing and the post-game results screen will list results for all users.

After a round is over, the admin alone will see a button to start the next round. The current round number is found in the page header. Likewise, the running point total for all lobby users can be found in the side drawer. The side drawer will also give indicators throughout the round if they are currently guessing or have submitted their answer.

As of now, the game can go on indefinitely and the filters and difficulty of the game will be set to the admin's selected filters. A TODO would be to maybe cap to 10 rounds or allow the admin to enter the number of rounds. Additionally, more customization options for points. i.e. award more points for a user that guesses a movie with no cast names vs. a user that uses a hint.
