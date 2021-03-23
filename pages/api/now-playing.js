var SpotifyWebApi = require('spotify-web-api-node');

const client_id = process.env.NEXT_EXAMPLE_SPOTIFY_CLIENTID;
const client_secret = process.env.NEXT_EXAMPLE_SPOTIFY_CLIENTSECRET;
const redirect_uri = process.env.NEXT_EXAMPLE_SPOTIFY_REDIRECTURI;

export default async (_, res) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: redirect_uri
    });

    if (spotifyApi) {
        spotifyApi.clientCredentialsGrant().then(data => {
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.getPlaylist(
                '13gGwH228n37VoIbY6NhbA',
                { limit: 10, offset: 20 }, (err, data) => {
                    if (err) {
                        console.error('Something went wrong! ', err);
                        return res.status(400).json(err)
                    } else {
                        return res.status(200).json(data.body)
                    }
                }
            );

        })
    }
};