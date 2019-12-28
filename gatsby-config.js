let firebaseConfig = require(`./src/config/firebase.json`)
if (process.env.FIREBASE_API_KEY) {
  firebaseConfig = {
    ...require(`./src/config/firebase.default.json`),
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: `@deanc/gatsby-source-firestorer`,
      options: {
        // credential or appConfig
        config: firebaseConfig,
        types: [
          {
            type: `Item`,
            collection: `items`,
            map: doc => ({
              ...doc,
              locations___NODE: doc.locations
                ? doc.locations.map(location => location.id)
                : [],
            }),
          },
          {
            type: `Country`,
            collection: `countries`,
            map: doc => ({
              ...doc,
            }),
          },
          {
            type: `Location`,
            collection: `locations`,
            map: doc => ({
              ...doc,
              country___NODE: doc.country ? doc.country.id : null,
            }),
          },
        ],
      },
    },
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/img/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
