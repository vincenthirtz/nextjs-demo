import querystring from 'querystring';

const refresh_token = `${process.env.NEXT_EXAMPLE_SPOTIFY_REFRESH_TOKEN}`
  .trim()
  .slice();
const basic = `${process.env.NEXT_EXAMPLE_SPOTIFY_CLIENT_BASIC}`.trim().slice();
const NOW_PLAYING_ENDPOINT =
  `${process.env.NEXT_EXAMPLE_SPOTIFY_NOW_PLAYING_ENDPOINT}`.trim().slice();
const TOP_TRACKS_ENDPOINT =
  `${process.env.NEXT_EXAMPLE_SPOTIFY_TOP_TRACKS_ENDPOINT}`.trim().slice();
const TOKEN_ENDPOINT = `${process.env.NEXT_EXAMPLE_SPOTIFY_TOKEN_ENDPOINT}`
  .trim()
  .slice();

const getAccessToken = async () => {
  return await fetch(`${TOKEN_ENDPOINT}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  }).then((res) => res.json());
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(`${NOW_PLAYING_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(`${TOP_TRACKS_ENDPOINT}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
