require('dotenv').config()

module.exports = {
  env: {
    NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
    NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET: process.env.NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET,
    NEXT_EXAMPLE_CHANNEL_TWITCH: process.env.NEXT_EXAMPLE_CHANNEL_TWITCH,
    NEXT_EXAMPLE_FIREBASE_API_KEY: process.env.NEXT_EXAMPLE_FIREBASE_API_KEY,
    NEXT_EXAMPLE_SITE_URL: process.env.NEXT_EXAMPLE_SITE_URL,
    NEXT_EXAMPLE_FIREBASE_AUTH_DOMAIN: process.env.NEXT_EXAMPLE_FIREBASE_AUTH_DOMAIN,
    NEXT_EXAMPLE_FIREBASE_PROJECT_ID: process.env.NEXT_EXAMPLE_FIREBASE_PROJECT_ID,
    NEXT_EXAMPLE_FIREBASE_STORAGE_BUCKET: process.env.NEXT_EXAMPLE_FIREBASE_STORAGE_BUCKET,
    NEXT_EXAMPLE_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_EXAMPLE_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_EXAMPLE_FIREBASE_APP_ID: process.env.NEXT_EXAMPLE_FIREBASE_APP_ID,
    NEXT_EXAMPLE_FIREBASE_MEASUREMENT_ID: process.env.NEXT_EXAMPLE_FIREBASE_MEASUREMENT_ID,
    NEXT_EXAMPLE_SPOTIFY_CLIENTID: process.env.NEXT_EXAMPLE_SPOTIFY_CLIENTID,
    NEXT_EXAMPLE_SPOTIFY_CLIENTSECRET: process.env.NEXT_EXAMPLE_SPOTIFY_CLIENTSECRET,
    NEXT_EXAMPLE_SPOTIFY_REDIRECTURI: process.env.NEXT_EXAMPLE_SPOTIFY_REDIRECTURI
  },
}
